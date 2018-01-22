"use strict";
// admin-related
Object.defineProperty(exports, "__esModule", { value: true });
const swagger = require("swagger-node-express");
class Orders {
    constructor(pool, users) {
        this.pool = pool;
        this.users = users;
        this.defaultLimit = 100;
        this.defaultOffset = 0;
        ///////////////////////////////////////////////
        ///
        ///  REST method descriptions
        this.getOrders = {
            'spec': {
                description: "Operations about Orders",
                path: "/orders",
                method: "GET",
                summary: "Get all Orders",
                notes: "Returns Orders",
                type: "array",
                items: {
                    $ref: "order"
                },
                nickname: "getOrders",
                produces: ["application/json"],
                parameters: [
                    // swagger.params.query ("username", "Name of User to be fetched", "string", false),
                    swagger.params.query("limit", "Limit number of results", "number", false, null, this.defaultLimit),
                    swagger.params.query("offset", "Use together with 'limit' for paging", "number", false, null, 0)
                ],
                responseMessages: [{
                        "code": 500,
                        "message": 'internal server error'
                    }]
            },
            'action': (req, res) => {
                this.doGetOrders(req, req.auth, req.query.limit, req.query.offset)
                    .then(result => {
                    res.send(JSON.stringify(result));
                })
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        this.deleteOrders = {
            'spec': {
                description: "Operations about Orders",
                path: "/orders/{id}",
                method: "DELETE",
                summary: "delete the selected Orders",
                notes: "Returns number of deleted Orders",
                type: "count",
                nickname: "deleteOrders",
                produces: ["application/json"],
                parameters: [
                    swagger.params.path("id", "id of Order", "long")
                ],
                responseMessages: [{
                        "code": 500,
                        "message": 'internal server error'
                    }]
            },
            'action': (req, res) => {
                this.doDeleteOrders(req)
                    .then(result => {
                    res.send(JSON.stringify(result));
                })
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        this.getOrdersByID = {
            'spec': {
                description: "Operations about Orders",
                path: "/orders/{id}",
                method: "GET",
                summary: "Get one specific Order",
                notes: "Returns one Order",
                type: "order",
                nickname: "getOrdersByID",
                produces: ["application/json"],
                parameters: [
                    swagger.params.path("id", "ID of the order", "long")
                ],
                responseMessages: [
                    { "code": 400, "message": 'invalid id' },
                    // { "code": 404, "message": 'id not found' },
                    { "code": 500, "message": 'internal server error' }
                ]
            },
            'action': (req, res) => {
                if (!req.params.id) {
                    throw swagger.errors.invalid('id');
                }
                let id = parseInt(req.params.id);
                if (isNaN(id)) {
                    throw swagger.errors.invalid('id');
                }
                this.doGetOrdersByID(req, req.auth, req.params.id)
                    .then(result => res.send(JSON.stringify(result)))
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        this.postOrders = {
            'spec': {
                description: "Operations about Users",
                path: "/orders",
                method: "POST",
                summary: "Create an order",
                notes: "Returns orderID",
                type: "order",
                nickname: "PostOrders",
                produces: ["application/json"],
                parameters: [
                    //    swagger.params.path ("username", "UserName of User", "string"), 
                    swagger.params.body("body", 'Order as JSON string', "string")
                ],
                responseMessages: [
                    { "code": 400, "message": 'invalid parameter' },
                    // { "code": 404, "message": 'id not found' },
                    { "code": 500, "message": 'internal server error' }
                ]
            },
            'action': (req, res) => {
                //if (!req.params.username) {
                // throw swagger.errors.invalid('username');
                //}
                this.doPostOrders(req, req.auth, req.params.id)
                    .then(result => res.send(JSON.stringify(result)))
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
    }
    mount() {
        swagger
            .addGet(this.getOrders)
            .addGet(this.getOrdersByID)
            .addPost(this.postOrders)
            .addDelete(this.deleteOrders);
        // .addPost (this.postUserWithQueryParameter)
        // .addPost (this.postUsers)
        // .addDelete (this.deleteUserById)
        swagger.configureDeclaration("Orders", {
            description: "Operations about Orders",
            produces: ["application/json"]
        });
    }
    ///////////////////////////////////////////////
    ///
    ///  DB access methods
    doGetOrders(req, auth, limit, offset) {
        return new Promise((resolve, reject) => {
            if (!req.hasOwnProperty('auth')) {
                return reject("Not logged in");
            }
            let sql = "SELECT * FROM orders";
            let params = [limit || this.defaultLimit, offset || 0];
            sql += "  LIMIT $1 OFFSET $2";
            this.pool
                .query(sql, params)
                .then(res => {
                resolve(res.rows);
            })
                .catch(error => {
                console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                reject(error.toString());
            });
        });
    }
    doGetOrdersByID(req, auth, id) {
        return new Promise((resolve, reject) => {
            // req.auth, req.params.username
            if (!req.hasOwnProperty('auth')) {
                return reject("Not logged in");
            }
            let sql = "SELECT * FROM orders where pk_orderid = $1";
            let params = [id];
            this.pool
                .query(sql, params)
                .then(res => {
                if (res.rows.length == 1) {
                    resolve(res.rows);
                }
                else {
                    reject("Order not found");
                }
            })
                .catch(error => {
                console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                reject(error.toString());
            });
        });
    }
    doPostOrders(req, auth, id) {
        return new Promise((resolve, reject) => {
            if (!req.hasOwnProperty('auth')) {
                return reject("Not logged in");
            }
            let requiredFields = ["pk_orderid", "orderdate", "deliverydate", "paymentstate", "paymentmethod", "price", "fk_username"];
            for (let i = 0; i < requiredFields.length; i++) {
                if (!req.body.hasOwnProperty(requiredFields[i])) {
                    reject(`Missing field: ${requiredFields[i]}`);
                    return;
                }
            }
            // create query for insert into orders table
            let sql2 = "INSERT INTO orders(";
            let params2 = [];
            let allFieldsSql2 = ["pk_orderid", "orderdate", "deliverydate", "paymentstate", "paymentmethod", "price", "fk_username"];
            let i = 0;
            for (; i < allFieldsSql2.length; i++) {
                if (req.body.hasOwnProperty(allFieldsSql2[i])) {
                    if (i != 0) {
                        sql2 += `, `;
                    }
                    sql2 += ` ${allFieldsSql2[i]}`;
                    params2.push(req.body[allFieldsSql2[i]]);
                }
            }
            // let orderdate = req.body.orderdate; 
            sql2 += `) VALUES (`;
            for (let j = 0; j < i; j++) {
                if (j != 0) {
                    sql2 += `, `;
                }
                sql2 += `$${j + 1}`;
            }
            sql2 += `) `;
            // check 
            console.log(sql2);
            console.log(JSON.stringify(params2));
            //insert into db
            this.pool
                .query(sql2, params2)
                .catch(error => {
                console.error(sql2 + " with params " + JSON.stringify(params2) + ": " + error.toString());
                reject(error.toString());
            });
            // create query for insert into orderitems table
            let p = 0;
            let currentItem;
            let sql1 = "INSERT INTO orderitems(";
            let params1 = [];
            let allFieldsSql1 = ["pk_fk_itemid", "price", "amount", "fk_productid"];
            let h = 0;
            let n = 0;
            //get item array and iterate through it
            if (req.body.hasOwnProperty("item")) {
                let arrayOfItems = req.body["item"];
                for (; p < arrayOfItems.length; p++) {
                    // reset h, n, parameter and query so that a new query can be made for next item
                    h = 0;
                    n = 0;
                    sql1 = "INSERT INTO orderitems(";
                    params1 = [];
                    console.log("ITEMS!! " + JSON.stringify(arrayOfItems[p], null, 2));
                    currentItem = arrayOfItems[p];
                    //  console.log("currentItem stelle " + p + " wert is " + currentItem[allFieldsSql1[p]] + "tag ist " + `${allFieldsSql1[p]}`);
                    //add orderID as foreignkey
                    params1.push(req.body["pk_orderid"]);
                    sql1 += `fk_pk_orderid, `;
                    n++;
                    for (; h < allFieldsSql1.length; h++) {
                        if (currentItem.hasOwnProperty(allFieldsSql1[h])) {
                            if (h != 0) {
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
                    for (let j = 0; j < n; j++) {
                        if (j != 0) {
                            sql1 += `, `;
                        }
                        sql1 += `$${j + 1}`;
                    }
                    sql1 += `) `;
                    // check current status of query sql1
                    console.log(sql1);
                    console.log(JSON.stringify(params1));
                    // make insert query on DB for the current item
                    this.pool
                        .query(sql1, params1)
                        .catch(error => {
                        console.error(sql1 + " with params " + JSON.stringify(params1) + ": " + error.toString());
                        reject(error.toString());
                    })
                        .then(resolve({ "pk_username": req.body.fk_username }));
                }
            }
            else {
                console.log("no ITEMS!! ");
            }
        });
    }
    doDeleteOrders(req) {
        return new Promise((resolve, reject) => {
            if (!req.hasOwnProperty('auth')) {
                return reject("Not logged in");
            }
            let sql = "DELETE FROM orders where pk_orderid = $1 RETURNING *";
            let params = [req.params.id];
            this.pool
                .query(sql, params)
                .then(res => {
                if (res.rows.length == 1) {
                    resolve(res.rows);
                }
                else {
                    reject("No such order");
                }
            })
                .catch(error => {
                console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                reject(error.toString());
            });
        });
    }
}
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map