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
                path: "/orders/{username}",
                method: "POST",
                summary: "Create an order",
                notes: "Returns orderID",
                type: "order",
                nickname: "postOrders",
                produces: ["application/json"],
                parameters: [
                    swagger.params.path("username", "UserName of User", "string"),
                    swagger.params.body("body", 'Order as JSON string', "string")
                ],
                responseMessages: [
                    { "code": 400, "message": 'invalid parameter' },
                    // { "code": 404, "message": 'id not found' },
                    { "code": 500, "message": 'internal server error' }
                ]
            },
            'action': (req, res) => {
                if (!req.params.username) {
                    throw swagger.errors.invalid('username');
                }
                this.doPostOrders(req)
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
            .addPost(this.postOrders);
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
    doPostOrders(req) {
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
            //let sql1 = "UPDATE users SET";
            let sql2 = "INSERT INTO orders(";
            let params = [];
            let allFields = ["pk_orderid", "orderdate", "deliverydate", "paymentstate", "paymentmethod", "price", "fk_username"];
            let i = 0;
            for (; i < allFields.length; i++) {
                if (req.body.hasOwnProperty(allFields[i])) {
                    if (i != 0) {
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
            for (let j = 0; j < i; j++) {
                if (j != 0) {
                    sql2 += `, `;
                }
                sql2 += `$${j + 1}`;
            }
            //   sql1 += ` WHERE pk_username = $${i+1}`;
            //   sql2 += ` WHERE NOT EXISTS (SELECT 1 FROM users WHERE pk_username = $${i+1})`;
            params.push(req.params.username);
            // console.log(sql1);
            console.log(sql2);
            console.log(JSON.stringify(params));
            this.pool
                .query(sql2, params)
                .then(res => {
                if (res.rows.length == 1) {
                    resolve(res.rows);
                }
                else {
                    reject("Failed");
                }
            })
                .catch(error => {
                console.error(sql2 + " with params " + JSON.stringify(params) + ": " + error.toString());
                reject(error.toString());
            });
        });
    }
}
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map