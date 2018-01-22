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

  // private defaultLimit : number = 100;
  // private defaultOffset = 0;

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
      path : "/cart/{username}",
      method: "GET",
      summary : "Get cart for specific user",
      notes : "Returns cart items",
      type : "cart",
      nickname : "getCartItems",
      produces : ["application/json"],
       parameters : [
          swagger.params.path("username", "username of the user", "string")
        ],
      responseMessages : [  
	  { "code": 400, "message": 'invalid name' },
        { "code": 500, "message": 'internal server error'}]
    },
    'action': (req,res) => {
       if (!req.params.username) {
        throw swagger.errors.invalid('username');
      }
     
      this.doGetCartItems (req)
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

     public doGetCartItems (req: Request) : Promise<Types.CartItems[]> {
    return new Promise ((resolve, reject) => {
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      let sql = "SELECT * FROM shoppingcartitems where fk_pk_username = $1";
	  console.log("this is the query" + sql);
      let params: [string | number] = [req.params.username];
      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length >= 1){
          resolve (res.rows);
        } else {
            reject ("no cart");
          }
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
        reject (error.toString());
      });
    });
  }



  }
