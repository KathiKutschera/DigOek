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
      let requiredFields = ["pk_username", "pwhash", "email"];

      for(let i = 0; i < requiredFields.length; i++){
        if(! req.body.hasOwnProperty(requiredFields[i])){
          reject(`Missing field: ${requiredFields[i]}` );
          return;
        }
      }
      
      let sql = "INSERT INTO users(";
      let params = [];

        
        let allFields = ["pk_username", "pwhash", "email", "name", "surname", "companyname", "billingaddress", "deliveryaddress", "vat", "nameoncc", "creditcardnr", "validyear", "validmonth", "ccv"];
      let i = 0;
      for(; i < allFields.length; i++){
        if(req.body.hasOwnProperty(allFields[i])){
          if(i != 0){
            sql += `, `;
          }
          sql += ` ${allFields[i]}`;
          if(allFields[i] == "pwhash"){
            params.push(crypto.createHash('sha256').update(req.body[allFields[i]]).digest('base64'));
          } else {
            params.push(req.body[allFields[i]]);
          }
        }
      }
      sql += ", isadmin";
      params.push(false);

      sql += `) VALUES( `;
      for(let j = 0; j < params.length; j++){
        if(j != 0){
          sql += `, `;
        }
        sql += `$${j+1}`;
      }

      sql += `)`;
    
      this.pool
      .query (sql, params)
      .catch (error => {
        console.error("User already existing");
        reject ("User already existing");
      })
      .then (res => {
          resolve ({"pk_username": req.params.username});
      });
    });
  }


}
