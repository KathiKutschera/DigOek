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
                this.doGetOrders(req.auth, req.query.limit, req.query.offset)
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
                this.doGetOrdersByID(req.auth, req.params.id)
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
            .addGet(this.getOrdersByID);
        // .addPut (this.putUserById)
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
    doGetOrders(auth, limit, offset) {
        return new Promise((resolve, reject) => {
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
    doGetOrdersByID(auth, id) {
        return new Promise((resolve, reject) => {
            // req.auth, req.params.username
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
}
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map