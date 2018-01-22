// admin-related

// REST method declaration
import * as url from "url";
import * as swagger from "swagger-node-express";

// DB access
import * as pg from 'pg';

// shared datatypes
import * as Types from "./types";

// Time format processing
import * as moment from 'moment';

// Needed for password check
import * as crypto from 'crypto';
import { Request } from "express-serve-static-core";


export class ShoppingCart {

  private defaultLimit : number = 100;
  private defaultOffset = 0;

  constructor (private pool, private users) {
  }

  public mount () {
    swagger
    .addGet (this.getCartItems)
    //.addGet (this.getOrdersByID)
    //.addPut(this.putOrdersByID)
    //.addPost (this.postOrders)
    //.addDelete(this.deleteOrders)
    // .addPost (this.postUserWithQueryParameter)
    // .addPost (this.postUsers)
    // .addDelete (this.deleteUserById)
    swagger.configureDeclaration("Cart", {
        description : "Operations about shopping cart",
        produces: ["application/json"]
    });
  }
  
  ///////////////////////////////////////////////
  ///
  ///  REST method descriptions

  public getCartItems = {
    'spec': {
      description : "Operations about shopping cart",
      path : "/cart/{id}",
      method: "GET",
      summary : "Get cart for specific user",
      notes : "Returns cart items",
      type : "array",
      items: {
        $ref: "cart"
      },
      nickname : "getCart",
      produces : ["application/json"],
       parameters : [
          swagger.params.path("id", "ID of the user", "long")
        ],
      responseMessages : [{
        "code": 500,
        "message": 'internal server error'
      }]
    },
    'action': (req,res) => {
       if (!req.params.id) {
        throw swagger.errors.invalid('id');
      }
      let id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw swagger.errors.invalid('id');
      }
      this.doGetCartItems (req, req.auth, req.params.id)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };


  ///////////////////////////////////////////////
  ///
  ///  DB access methods

     public doGetCartItems (req: Request, auth: Types.Auth, id: number) : Promise<Types.ChartItems> {
    return new Promise ((resolve, reject) => {
      // req.auth, req.params.username
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      let sql = "SELECT * FROM shoppingcartitems where fk_pk_username = $1";
      let params: [number] = [id];
      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length == 1){
          resolve (res.rows);
        } else {
            reject ("Cart not found");
          }
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
        reject (error.toString());
      });
    });
  }

  
  
  }
