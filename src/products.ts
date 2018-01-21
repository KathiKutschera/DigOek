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


export class Products {

  private defaultLimit : number = 100;
  private defaultOffset = 0;

  constructor (private pool, private users) {
  }

  public mount () {
    swagger
    .addGet (this.getProducts)
    .addGet (this.getProductByID)
    // .addPut (this.putUserById)
    // .addPost (this.postUserWithQueryParameter)
    // .addPost (this.postUsers)
    // .addDelete (this.deleteUserById)
    swagger.configureDeclaration("Products", {
        description : "Operations about Products",
        produces: ["application/json"]
    });
  }




  ///////////////////////////////////////////////
  ///
  ///  REST method descriptions

  public getProducts = {
    'spec': {
      description : "Operations about Products",
      path : "/products",
      method: "GET",
      summary : "Get all Products",
      notes : "Returns Products",
      type : "array",
      items: {
        $ref: "product"
      },
      nickname : "getProducts",
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
      this.doGetProducts (req.auth, req.query.limit, req.query.offset)
      .then (result => {
          res.send(JSON.stringify(result))
      })
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  public getProductByID = {
    'spec': {
      description : "Operations about Products",
      path : "/products/{id}",
      method: "GET",
      summary : "Get one Product",
      notes : "Returns one Product",
      type : "product",
      nickname : "getProductByID",
      produces : ["application/json"],
      parameters : [
          swagger.params.path("id", "ID of the product", "long")
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
	
      this.doGetProductByID (req.auth, id)
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

  public doGetProducts (auth: Types.Auth, limit: number, offset: number) : Promise<Types.Product[]> {
    return new Promise ((resolve, reject) => {
      let sql = "SELECT * FROM products";
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

 public doGetProductByID (auth: Types.Auth, id: number) : Promise<Types.Product> {
    return new Promise ((resolve, reject) => {
      // req.auth, req.params.username
      let sql = "SELECT * FROM products where pk_productid = $1";
      let params: [number] = [id];
      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length == 1){
          resolve (res.rows);
        } else {
            reject ("No such product");
          }
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
        reject (error.toString());
      });
    });
  }

}
