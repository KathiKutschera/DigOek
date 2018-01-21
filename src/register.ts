// user registration

// REST method declaration
import * as url from "url";
import * as swagger from "swagger-node-express";

// req, res types
import * as express from 'express';
// DB access
import * as pg from 'pg';

// shared datatypes
import * as Types from "./types";

// Needed for password check
import * as crypto from 'crypto';

export class Register {

  constructor (private pool, private users) {
  }

  public mount () {
    swagger
    .addPost (this.postRegister)
    swagger.configureDeclaration("Register", {
      description : "Operations about Registration",
      produces: ["application/json"]
    });
  }



  ///////////////////////////////////////////////
  ///
  ///  REST method descriptions

  public postRegister = {
    'spec': {
      description : "Operations about Registration",
      path : "/register",
      method: "POST",
      summary : "Post a new Registration",
      notes : "Returns username",
      type : "user",
      items: {
        $ref: "user"
      },
      nickname : "postRegister",
      produces : ["application/json"],
      parameters : [
        // swagger.params.query ("username", "Name of User to be fetched", "string", false),
        // swagger.params.query ("limit", "Limit number of results", "number", false, null, this.defaultLimit),
        // swagger.params.query ("offset", "Use together with 'limit' for paging", "number", false, null, 0)
        swagger.params.body ("body", "User as JSON string", "string")
      ],
      responseMessages : [{
        "code": 500,
        "message": 'internal server error'
      }]
    },
    'action': (req,res) => {
      this.doPostRegister (req)
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

  public doPostRegister (req: Request) : Promise<Types.Username[]> {
    return new Promise ((resolve, reject) => {
      // be sure not to OVERWRITE existing users (Only INSTERT, not UPDATE)
      let sql = "";
      let params = [];

      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length == 1){
          resolve (res.rows);
        } else {
          reject ("Failed");
        }
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
        reject (error.toString());
      });
    });
  }


}
