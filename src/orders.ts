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
    .addGet (this.getOrdersByID)
    .addPost (this.postOrders)
    .addDelete(this.deleteOrders)
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
      this.doGetOrders (req, req.auth, req.query.limit, req.query.offset)
      .then (result => {
          res.send(JSON.stringify(result))
      })
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  public deleteOrders = {
    'spec': {
      description : "Operations about Orders",
      path : "/orders/{id}",
      method: "DELETE",
      summary : "delete the selected Orders",
      notes : "Returns number of deleted Orders",
      type : "count",
      nickname : "deleteOrders",
      produces : ["application/json"],
      parameters : [
        swagger.params.path("id", "id of Order", "long")
      ],
      responseMessages : [{
        "code": 500,
        "message": 'internal server error'
      }]
    },
    'action': (req,res) => {
      this.doDeleteOrders (req)
      .then (result => {
          res.send(JSON.stringify(result))
      })
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };
  
  
   public getOrdersByID = {
    'spec': {
      description : "Operations about Orders",
      path : "/orders/{id}",
      method: "GET",
      summary : "Get one specific Order",
      notes : "Returns one Order",
      type : "order",
      nickname : "getOrdersByID",
      produces : ["application/json"],
      parameters : [
          swagger.params.path("id", "ID of the order", "long")
        ],
      responseMessages : [
        { "code": 400, "message": 'invalid id' },
        // { "code": 404, "message": 'id not found' },
        { "code": 500, "message": 'internal server error'}
      ]
    },
    'action': (req,res) => {
      if (!req.params.id) {
        throw swagger.errors.invalid('id');
      }
      let id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw swagger.errors.invalid('id');
      }
      this.doGetOrdersByID (req, req.auth, req.params.id)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  
    public postOrders = {
    'spec': {
      description : "Operations about Users",
      path : "/orders",
      method: "POST",
      summary : "Create an order",
      notes : "Returns orderID",
      type : "order",
      nickname : "PostOrders",
      produces : ["application/json"],
      parameters : [
        swagger.params.path ("username", "UserName of User", "string"), 
        swagger.params.body("body", 'Order as JSON string', "string")
      ],
      responseMessages : [
        { "code": 400, "message": 'invalid parameter' },
        // { "code": 404, "message": 'id not found' },
        { "code": 500, "message": 'internal server error'}
      ]
    },
    'action': (req,res) => {
      if (!req.params.username) {
        throw swagger.errors.invalid('username');
      }
      this.doPostOrders (req, req.auth, req.params.id)
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

  public doGetOrders (req: Request, auth: Types.Auth, limit: number, offset: number) : Promise<Types.Order[]> {
    return new Promise ((resolve, reject) => {
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
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
  
  
   public doGetOrdersByID (req: Request, auth: Types.Auth, id: number) : Promise<Types.Order> {
    return new Promise ((resolve, reject) => {
      // req.auth, req.params.username
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      let sql = "SELECT * FROM orders where pk_orderid = $1";
      let params: [number] = [id];
      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length == 1){
          resolve (res.rows);
        } else {
            reject ("Order not found");
          }
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
        reject (error.toString());
      });
    });
  }




  public doPostOrders (req: Request, auth: Types.Auth, id: number) : Promise<Types.Id> {
   
   return new Promise ((resolve, reject) => {
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      let requiredFields = ["pk_orderid", "orderdate", "deliverydate", "paymentstate", "paymentmethod", "price", "fk_username"];

      for(let i = 0; i < requiredFields.length; i++){
        if(! req.body.hasOwnProperty(requiredFields[i])){
          reject(`Missing field: ${requiredFields[i]}` );
          return;
        }
      }

      //let sql1 = "UPDATE users SET";
      let sql2 = "INSERT INTO orders(";
      let params = [];

      let allFields = ["pk_orderid", "orderdate", "deliverydate", "paymentstate", "paymentmethod", "price", "fk_username"];
      let i = 0;
      for(; i < allFields.length; i++){
        if(req.body.hasOwnProperty(allFields[i])){
          if(i != 0){
          //  sql1 += `, `;
            sql2 += `, `;
          }
        //  sql1 += ` ${allFields[i]} = $${i+1}` ;
          sql2 += ` ${allFields[i]}`;
         // if(allFields[i] == "pwhash"){
          //  params.push(crypto.createHash('sha256').update(req.body[allFields[i]]).digest('base64'));
          //} else {
            params.push(req.body[allFields[i]]);
          //}
        }
      }

      sql2 += `) VALUES `;
      for(let j = 0; j < i; j++){
        if(j != 0){
          sql2 += `, `;
        }
        sql2 += `$${j+1}`;
      }

   //   sql1 += ` WHERE pk_username = $${i+1}`;
   //   sql2 += ` WHERE NOT EXISTS (SELECT 1 FROM users WHERE pk_username = $${i+1})`;

      params.push(req.params.username);

      console.log(sql1);
      console.log(sql2);
      console.log(JSON.stringify(params));

      this.pool
        .query(sql1, params)
        .catch (error => {
          console.error(sql1 + " with params "+JSON.stringify (params) + ": " + error.toString());
          reject (error.toString());
        })
        .then ( _ => this.pool.query (sql2, params))
        .catch ( error => {
          console.error(sql2 + " with params "+JSON.stringify (params) + ": " + error.toString());
          reject (error.toString());
        })
        .then ( _ => resolve ({"pk_username": req.params.username}))
      });
    }
    
    public doDeleteOrders (req: Request) : Promise<Types.Count> {
      return new Promise ((resolve, reject) => {
        if (! req.hasOwnProperty ('auth')) {
          return reject ("Not logged in");
        }
  
        let sql = "DELETE FROM orders where pk_orderid = $1 RETURNING *";
        let params: [number] = [req.params.id];
        this.pool
        .query (sql, params)
        .then (res => {
          if(res.rows.length == 1){
            resolve (res.rows);
          } else {
              reject ("No such order");
            }
        })
        .catch (error => {
          console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
          reject (error.toString());
        });
      });
    }
  
  }
