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
    .addGet (this.getShoppingCart)
    .addPut(this.putCartItemByID)
    .addPost (this.postCartItem)
    .addDelete(this.deleteShoppingCartItem)
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
      type : "cart",
      nickname : "getCartItems",
      produces : ["application/json"],
       parameters : [
          swagger.params.path("id", "id of the shoppingCartItem", "long")
        ],
      responseMessages : [  
	  { "code": 400, "message": 'invalid name' },
        { "code": 500, "message": 'internal server error'}]
    },
    'action': (req,res) => {
       if (!req.params.id) {
        throw swagger.errors.invalid('id');
      }
      let id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw swagger.errors.invalid('id');
      }
     
      this.doGetCartItems (req)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };


  public deleteShoppingCartItem = {
    'spec': {
      description : "Operations about ShoppingCartItem",
      path : "/cart/{id}",
      method: "DELETE",
      summary : "delete the selected shopping cart item",
      notes : "Returns number of deleted items",
      type : "count",
      nickname : "deleteCartItem",
      produces : ["application/json"],
      parameters : [
        swagger.params.path("id", "id of the shopping cart item", "long")
      ],
      responseMessages : [{
        "code": 500,
        "message": 'internal server error'
      }]
    },
    'action': (req,res) => {
      this.doDeleteShoppingcartitems (req)
      .then (result => {
          res.send(JSON.stringify(result))
      })
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };
  
  
   public getShoppingCart = {
    'spec': {
      description : "Operations about Shopping Cart Items",
      path : "/cart",
      method: "GET",
      summary : "Get one shopping cart collection for one user",
      notes : "Returns a shopping cart collection for one user",
      type : "cart",
      nickname : "getShoppingCartItems",
      produces : ["application/json"],
      parameters : [
        swagger.params.query ("limit", "Limit number of results", "number", false, null, this.defaultLimit),
        swagger.params.query ("offset", "Use together with 'limit' for paging", "number", false, null, 0)
        ],
      responseMessages : [
        { "code": 400, "message": 'invalid id' },
        // { "code": 404, "message": 'id not found' },
        { "code": 500, "message": 'internal server error'}
      ]
    },
    'action': (req,res) => {
      this.doGetCart (req, req.auth, req.query.limit, 
          req.query.offset)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  
    public postCartItem = {
    'spec': {
      description : "Operations about Shopping Cart Items",
      path : "/cart",
      method: "POST",
      summary : "Create an Shopping Cart Item",
      notes : "Returns shoppingCartItemID",
      type : "cart",
      nickname : "PostCart",
      produces : ["application/json"],
      parameters : [
    //    swagger.params.path ("username", "UserName of User", "string"), 
        swagger.params.body("body", 'Order as JSON string', "string")
      ],
      responseMessages : [
        { "code": 400, "message": 'invalid parameter' },
        // { "code": 404, "message": 'id not found' },
        { "code": 500, "message": 'internal server error'}
      ]
    },
    'action': (req,res) => {
      this.doPostCartItem (req, req.auth, req.params.id)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };


  public putCartItemByID = {
    'spec': {
      description : "Operation to put Shopping Cart Items",
      path : "/cart/{id}",
      method: "PUT",
      summary : "Put one specific Shopping Cart Item",
      notes : "Returns the cartID",
      type : "cart",
      nickname : "putCartItemByID",
      produces : ["application/json"],
      parameters : [
          swagger.params.path("id", "ID of the cart item", "long"),
          swagger.params.body("body", "Data of the cart item", "string")
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
      this.doPutShoppingcartitemsByID (req, req.auth, req.params.id)
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
      let sql = "SELECT * FROM shoppingcartitems where fk_pk_username = $1 AND pk_cartid = $2";
	  console.log("this is the query" + sql);
      let params: [string | number] = [req.auth.user, 
        req.params.id];
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

  public doGetCart (req: Request, auth: Types.Auth, limit: number, offset: number) : Promise<Types.Order[]> {
    return new Promise ((resolve, reject) => {
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      let sql = "SELECT * FROM shoppingcartitems WHERE fk_pk_username = $3";
      let params: [string | number] = [limit || this.defaultLimit, offset || 0];
      sql += " LIMIT $1 OFFSET $2";
      params.push(req.auth.user);
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

  public doPostCartItem (req: Request, auth: Types.Auth, 
    id: number) : Promise<Types.Id> {
   return new Promise ((resolve, reject) => {
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      
      let requiredFields = ["amount", 
      "price", "fk_pk_productid"];

      for(let i = 0; i < requiredFields.length; i++){
        if(! req.body.hasOwnProperty(requiredFields[i])){
          reject(`Missing field: ${requiredFields[i]}` );
          return;
        }
      }

	  // create query for insert into orders table
      let sql2 = "INSERT INTO shoppingcartitems(fk_pk_username";
      let params2 = [];
      params2.push(req.auth.user)

      let allFieldsSql2 = ["pk_cartid", "amount", 
        "price", "fk_pk_productid"];
      let i = 0;

      for(; i < allFieldsSql2.length; i++){
        if(req.body.hasOwnProperty(allFieldsSql2[i])){
          if(i != 0){
            sql2 += `, `;
          }
          sql2 += ` ${allFieldsSql2[i]}`;
            params2.push(req.body[allFieldsSql2[i]]);
        }
      }
	  
	 // let orderdate = req.body.orderdate; 

      sql2 += `) VALUES (`;
      for(let j = 0; j < params2.length; j++){
        if(j != 0){
          sql2 += `, `;
        }
        sql2 += `$${j+1}`;

      }
	  	  
	  sql2 += `) RETURNING *`;
	  
	  // check 
	    console.log(sql2);
      console.log(JSON.stringify(params2));
	  
	  //insert into db
	  this.pool
		.query (sql2, params2)
        .then (res => {
        resolve (res.rows);
      })
        .catch ( error => {
          console.error(sql2 + " with params "+JSON.stringify (params2) + ": " + error.toString());
          reject (error.toString());
        });
	  
	  });

    }

    
    public doDeleteShoppingcartitems (req: Request) : 
    Promise<Types.Count> {
      return new Promise ((resolve, reject) => {
        if (! req.hasOwnProperty ('auth')) {
          return reject ("Not logged in");
        }
  
        let sql = "DELETE FROM shoppingcartitems where pk_cartid = $1 AND fk_pk_username=$2 RETURNING *";
        let params: [number | string] = [req.params.id, 
          req.auth.user];
        this.pool
        .query (sql, params)
        .then (res => {
          if(res.rows.length == 1){
            resolve (res.rows);
          } else {
              reject ("No such shoppingcartitems");
            }
        })
        .catch (error => {
          console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
          reject (error.toString());
        });
      });
    }

    public doPutShoppingcartitemsByID(req:Request, 
      auth:Types.Auth, id:number){
        return new Promise ((resolve, reject) => {
          if (! req.hasOwnProperty ('auth')) {
            return reject ("Not logged in");
          }

          let sql2 = "UPDATE shoppingcartitems SET ";

          let allFieldsSql2 = ["amount", 
            "price", "fk_pk_productid"];
          let i = 0;

          for(; i < allFieldsSql2.length; i++){
            if(req.body.hasOwnProperty(allFieldsSql2[i])){
              if(i != 0){
                sql2 += `, `;
              }
              sql2 += ` ${allFieldsSql2[i]} = ${req.body[allFieldsSql2[i]]}` ;
            }
          }
              
        sql2 += ` WHERE pk_cartid = ${id} AND fk_pk_username = `+
          req.auth.user+" RETURNING *";
        
        // check 
        console.log(sql2);
        
        //insert into db
        this.pool
        .query (sql2)
        .then (res => {
          if(res.rows.length == 1){
            resolve (res.rows);
          } else {
              reject ("No such shoppingcartitem or not your data");
            }
        })
            .catch ( error => {
              console.error(sql2 + ": " + error.toString());
              reject (error.toString());
            });
        });
      }

  }
