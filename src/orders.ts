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


export class Orders {

  private defaultLimit : number = 100;
  private defaultOffset = 0;

  constructor (private pool, private users) {
  }

  public mount () {
    swagger
    .addGet (this.getOrders)
    .addGet (this.getOrdersByID)
    .addPut(this.putOrdersByID)
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
      path : "/orders", // /{username}
      method: "POST",
      summary : "Create an order",
      notes : "Returns orderID",
      type : "order",
      nickname : "PostOrders",
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
      //if (!req.params.username) {
       // throw swagger.errors.invalid('username');
      //}
      this.doPostOrders (req, req.auth, req.params.id)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };


  public putOrdersByID = {
    'spec': {
      description : "Operation to put Orders",
      path : "/orders/{id}",
      method: "PUT",
      summary : "Put one specific Order",
      notes : "Returns the orderID",
      type : "order",
      nickname : "putOrdersByID",
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
      this.doPutOrdersByID (req, req.auth, req.params.id)
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
	  let fk_username = req.auth.user;
	  let sql;
	 if(fk_username == "admin"){
		   sql = "select * from orders inner join orderitems on orders.pk_orderid = orderitems.fk_pk_orderid ORDER BY orders.pk_orderid ";
		    console.log ( "sql = " + sql);
	 }
	 else{ 
		  sql = "SELECT * FROM orders inner join orderitems on orders.pk_orderid = orderitems.fk_pk_orderid where fk_username ='" +   fk_username + "' ORDER BY orders.pk_orderid";
			console.log ( "sql = " + sql);
	 }
		 // console.log ( "fk_username = " + fk_username);
		 
		  let params: [string | number] = [limit || this.defaultLimit, offset || 0];
		  sql += "  LIMIT $1 OFFSET $2";
		  this.pool
		  .query (sql, params)
		  .then (res => {			
				 if(res.rows.length >= 1){
					 console.log("im woring on it");
					let lastOrderId = undefined;
					let jsonArray : Types.Order[] = [];
			//		let items : Types.Item[] = [];
					for(let i=0; i < res.rows.length; i++){
						//	items = [];
						 if (res.rows[i].pk_orderid != lastOrderId) {
							jsonArray.push({ 
									pk_orderid : res.rows[i].pk_orderid, 
									orderdate :	res.rows[i].orderdate,
									deliverydate : res.rows[i].deliverydate, 
									paymentstate : res.rows[i].paymentstate, 
									paymentmethod :	res.rows[i].paymentmethod, 
									price :	res.rows[i].price,
									items : [],
										});
							
							lastOrderId = res.rows[i].pk_orderid;
						 }
						 let r = jsonArray.length - 1; // sicher >= 0
						  console.log("this is r " + r);
						  
						  //CHECK
						for(let h=0; h < jsonArray.length; h++){
							console.log(JSON.stringify(jsonArray[h], null, 2));
						}
							//console.log(jsonArray.items[0] + "!!!!!!!!!!!1");
							 jsonArray[r].items.push({ 
								pk_fk_itemid : res.rows[i].pk_fk_itemid,
								amount : res.rows[i].amount,
								fk_pk_orderid : res.rows[i].fk_pk_orderid,
								price : res.rows[i].price,
								fk_productid : res.rows[i].fk_productid,					 
							 });
							
					}
					resolve(jsonArray);
				}
			 
			//resolve (res.rows);
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
	  
	  let itemsArray = [];
	  
	  //select * from orders inner join orderitems on orders.pk_orderid = orderitems.fk_pk_orderid where orders.pk_orderid = 1;
      let sql = "SELECT * FROM orders inner join orderitems on orders.pk_orderid = orderitems.fk_pk_orderid where pk_orderid = $1";
      let params: [number] = [id];
      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length >= 1){
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
		  let requiredFields = ["orderdate", "deliverydate", "paymentstate", "paymentmethod", "price"];

		  for(let i = 0; i < requiredFields.length; i++){
			if(! req.body.hasOwnProperty(requiredFields[i])){
			  reject(`Missing field: ${requiredFields[i]}` );
			  return;
			}
		  }

		  // create query for insert into orders table
		  let sql2 = "INSERT INTO orders(pk_orderid,";
		  let params2 = [];

		  let allFieldsSql2 = ["orderdate", "deliverydate", "paymentstate", "paymentmethod", "price", "fk_username"];
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

		  sql2 += `, fk_username) VALUES (DEFAULT, `;
		  params2.push(req.auth.user);
          for(let j = 0; j < i; j++){
			if(j != 0){
			  sql2 += `, `;
			}
			sql2 += `$${j+1}`;

		  }
			  
		  sql2 += `) RETURNING pk_orderid`;
          let pk_orderid = 0;
		  
		  // check 
		  console.log(sql2);
		  console.log(JSON.stringify(params2));
		  //insert into db
		  this.pool
			.query (sql2, params2)
            .then( res => {pk_orderid = res.rows[0].pk_orderid;
		  console.log("ORDERID "+pk_orderid);
		  // create query for insert into orderitems table
		  
		  let p = 0;
		  let currentItem;
		  
		  let sql1 = "INSERT INTO orderitems(";
		  let params1 = [];
		  let allFieldsSql1 = ["price", "amount", "fk_productid"]
		   
		  let h = 0;
		  let n = 0;

		  let byed = [];
		  let amount = [];
		  
		  //get item array and iterate through it
		   if(req.body.hasOwnProperty("item")){
			let arrayOfItems = req.body["item"];
			for(; p < arrayOfItems.length; p++){
				 
				 // reset h, n, parameter and query so that a new query can be made for next item
				  h=0;
				  n=0;
				 sql1 = "INSERT INTO orderitems(";
				 params1 = [];
				 
				  
				console.log ("ITEMS!! " + JSON.stringify(arrayOfItems[p], null, 2));
				currentItem = arrayOfItems[p];
				  
				  
				//  console.log("currentItem stelle " + p + " wert is " + currentItem[allFieldsSql1[p]] + "tag ist " + `${allFieldsSql1[p]}`);
				
				//add orderID as foreignkey
                //got the id after the insert of the order. Don't change it!
				params1.push(pk_orderid);  
				sql1 += `fk_pk_orderid, pk_fk_itemid,`;
                params1.push(p+1);
				n++;
				 
				 
				  for(; h < allFieldsSql1.length; h++){
					if(currentItem.hasOwnProperty(allFieldsSql1[h])){
					 if( allFieldsSql1[h] == "fk_productid" ){
							byed.push(currentItem[allFieldsSql1[h]]);
							console.log ("pushed to byed " + currentItem[allFieldsSql1[h]]);
						}
						if(allFieldsSql1[h] == "amount"){
							amount.push(currentItem[allFieldsSql1[h]]);
							console.log ("pushed to amount " + currentItem[allFieldsSql1[h]]);
						}
						
						if(h != 0){
							sql1 += `, `;
						}
						console.log("TAG is " + allFieldsSql1[h] + " and h is " + h + "and value is " + currentItem[allFieldsSql1[h]]);
						 sql1 += ` ${allFieldsSql1[h]}`;
						params1.push(currentItem[allFieldsSql1[h]]);  
						 n++;
						 
					}
				  }
				  
				  //add $[nr] in VALUES()
				  sql1 += `) VALUES (`;
				  for(let j = 0; j < params1.length; j++){
					if(j != 0){
					  sql1 += `, `;
					}
					sql1 += `$${j+1}`;
				  }
					  
				  sql1 += `) `;
				  
				  // check current status of query sql1
				  console.log(sql1);
				  console.log(JSON.stringify(params1));
					
				// make insert query on DB for the current item
				   this.pool
				  .query (sql1, params1)
				  .catch (error => {
					console.error (sql1 + " with params "+JSON.stringify (params1) + ": " + error.toString());
					reject (error.toString());
				  });	
                  
                  

			 }
			 
			  
		   //Update available products   
			 i = 0;
			let base = [];
						
			for(;i < byed.length; i++){
				let boughtProduct = byed[i];
				let boughtAmount = amount[i];
			  let sql = "SELECT amountavailable FROM products WHERE pk_productid = " + boughtProduct +  ";";
			  this.pool
			  .query (sql)
			  .then (res => {
					let val = res.rows[0].amountavailable - boughtAmount;
					let sql3 = "UPDATE products SET amountavailable = " + 
					val + 
					" WHERE pk_productid = "+ boughtProduct +";";
					console.log(sql3);
				  
					this.pool.query (sql3)
						.then (resolve ({"pk_username": req.auth.user}))	
					  .catch ( error => {
						console.error(sql3 + ": " + error.toString());
						reject (error.toString());
					  });
			  
			  })
			  .catch (error => {
				console.error(sql + ": " + error.toString());
				reject (error.toString());
			  });
			}
		   
		   
		  }
		  else {
			  console.log ("no ITEMS!! ");
		  }
		  		 

		})

			.catch ( error => {
			  console.error(sql2 + " with params "+JSON.stringify (params2) + ": " + error.toString());
			  reject (error.toString());
			});
    });
    }
			

    
    public doDeleteOrders (req: Request) : Promise<Types.Count> {
      return new Promise ((resolve, reject) => {
        if (! req.hasOwnProperty ('auth')) {
			return reject ("Not logged in");
			}
			
		// query status of order: order can only be deleted if delivery date is null
			//TODO let sql = "DELETE FROM orders where pk_username = $1 AND (SELECT COUNT(paymentstate) FROM users JOIN orders ON (users.pk_username = orders.fk_username) WHERE users.pk_username = $1 and paymentstate='open') = 0 RETURNING *";
      //oben beschriebene Lösung ignoriert 
      //bereits vom availableAmount abgezogene Güter, daher: 
		
          let sql = "DELETE FROM orders where pk_orderid = $1 AND deliverydate IS NULL RETURNING *";
					let params: [number] = [req.params.id];
					this.pool
					.query (sql, params)
					.then (res => {
						if(res.rows.length == 1){
              //Dieser Wert wurde gelöscht --> 
              //Suchen aller dazugehörigen OrderItems, 
              //hinzufügen d. Produktanzahl
              //und löschen d. Items
              let sql2 = "SELECT fk_productid, amount FROM "
              +"orderitems where fk_pk_orderid = $1";

              this.pool.query(sql2, params)
              .then(res => {
                let i = 0;
                for(;i < res.rows.length; i++){
                  let amount = res.rows[i].amount;
                  let product = res.rows[i].fk_productid;
                  let sql3 = "UPDATE products SET amountavailable "
                   + "= " + amount + " WHERE pk_productid = " + product;
                   this.pool.query(sql3, params)
                   .catch (error => {
                    console.error(sql3 + ": " + error.toString());
                    reject (error.toString());
                    });
                }
                let sql4 = "DELETE FROM orderitems where fk_pk_orderid = $1";
                this.pool.query(sql4, params)
                .catch (error => {
                  console.error(sql4 + ": " + error.toString());
                  reject (error.toString());
                  });
              })					
              .catch (error => {
              console.error(sql2 + " with params "+JSON.stringify (params)+": " + error.toString());
              reject (error.toString());
              });

							resolve (res.rows);
						} else {
							reject ("No such order / delivery date already set");
						}
					})
					.catch (error => {
					console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
					reject (error.toString());
					});
			
		});
		
    }

    public doPutOrdersByID(req:Request, 
      auth:Types.Auth, id:number){
        return new Promise ((resolve, reject) => {
          if (! req.hasOwnProperty ('auth')) {
            return reject ("Not logged in");
          }
	
/*	
		 // create query for update the orders table
		  let sql2 = "UPDATE orders SET";
		  let params2 = [];

		let allFields = ["orderdate", "deliverydate", "paymentstate", "paymentmethod", "price"];
		  let i = 0;

		  for(; i < allFields.length; i++){
			if(req.body.hasOwnProperty(allFields[i])){
			  if(i != 0){
				sql2 += `, `;
			  }
			  sql2 += ` ${allFields[i]}`;
			   sql2 += ` =  req.body[allFields[i]]`;
				//params2.push(req.body[allFields[i]]);
			}
		  }
		  
		  sql += "WHERE pk_orderid = " + id;
				  
		  // check 
		  console.log(sql2);
		  //insert into db
		  this.pool
			.query (sql2)
            .then( res => {pk_orderid = res.rows[0].pk_orderid; 
		  

	//payment logic
		  let priceDifference; // if negative, the user has a debit; if poitive, the user must be refund
		  
		  if(req.body.hasOwnProperty("price")){
			  let sqlGetOldPrice = "SELECT price FROM orders WHERE orderid = " + id;
			  this.pool
				.query (sqlGetOldPrice)
				.then( res => {let val = res.rows[0].price - req.body["price"];
					
					let sql3 = "UPDATE products SET amountavailable = " + 
					val + 
					" WHERE pk_productid = "+ boughtProduct +";";
				});
		  
		  }
		*/  
		  
		  //// Bernhard:
		  
            let sql = "UPDATE orders SET paymentstate = '"
          + req.params.paymentstate + "', paymentmethod = '"
          + req.params.paymentmethod + "'";

          sql += "WHERE pk_orderid = " + id;

          this.pool
          .query (sql)
          .then (res => {
            if(res.rows.length == 1){
              resolve (res.rows);
            } else {
                reject ("No such order");
              }
          })
          .catch (error => {
            console.error(sql + ": " + error.toString());
            reject (error.toString());
          })
          .then (resolve (id));
        });  
      }
  
  }
