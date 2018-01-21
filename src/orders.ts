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


export class Orders {

  private defaultLimit : number = 100;
  private defaultOffset = 0;

  constructor (private pool, private users) {
  }

  public mount () {
    swagger
    .addGet (this.getOrders)
    //.addGet (this.getProductByID)
    // .addPut (this.putUserById)
    // .addPost (this.postUserWithQueryParameter)
    // .addPost (this.postUsers)
    // .addDelete (this.deleteUserById)
    swagger.configureDeclaration("Orders", {
        description : "Operations about Orders",
        produces: ["application/json"]
    });
  }




  ///////////////////////////////////////////////
  ///
  ///  REST method descriptions

  public getOrders = {
    'spec': {
      description : "Operations about Orders",
      path : "/orders",
      method: "GET",
      summary : "Get all Orders",
      notes : "Returns Orders",
      type : "array",
      items: {
        $ref: "order"
      },
      nickname : "getOrders",
      produces : ["application/json"],
      parameters : [
        // swagger.params.query ("username", "Name of User to be fetched", "string", false),
        swagger.params.query ("limit", "Limit number of results", "number", false, null, this.defaultLimit),
        swagger.params.query ("offset", "Use together with 'limit' for paging", "number", false, null, 0)
        ],
      responseMessages : [{
        "code": 500,
        "message": 'internal server error'
      }]
    },
    'action': (req,res) => {
      this.doGetOrders (req.auth, req.query.limit, req.query.offset)
      .then (result => {
          res.send(JSON.stringify(result))
      })
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };


  ///////////////////////////////////////////////
  ///
  ///  DB access methods

  public doGetOrders (auth: Types.Auth, limit: number, offset: number) : Promise<Types.Order[]> {
    return new Promise ((resolve, reject) => {
      let sql = "SELECT * FROM orders";
      let params: [string | number] = [limit || this.defaultLimit, offset || 0];
      sql += "  LIMIT $1 OFFSET $2";
      this.pool
      .query (sql, params)
      .then (res => {
        resolve (res.rows);
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
        reject (error.toString());
      });
    });
  }

}
