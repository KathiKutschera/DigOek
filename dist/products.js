"use strict";
// admin-related
Object.defineProperty(exports, "__esModule", { value: true });
const swagger = require("swagger-node-express");
class Products {
    constructor(pool, users) {
        this.pool = pool;
        this.users = users;
        this.defaultLimit = 100;
        this.defaultOffset = 0;
        ///////////////////////////////////////////////
        ///
        ///  REST method descriptions
        this.getProducts = {
            'spec': {
                description: "Operations about Products",
                path: "/products",
                method: "GET",
                summary: "Get all Products",
                notes: "Returns Products",
                type: "array",
                items: {
                    $ref: "product"
                },
                nickname: "getProducts",
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
                this.doGetProducts(req.auth, req.query.limit, req.query.offset)
                    .then(result => {
                    res.send(JSON.stringify(result));
                })
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        this.getProductByID = {
            'spec': {
                description: "Operations about Products",
                path: "/products/{id}",
                method: "GET",
                summary: "Get one Product",
                notes: "Returns one Product",
                type: "product",
                nickname: "getProductByID",
                produces: ["application/json"],
                parameters: [
                    swagger.params.path("id", "ID of the product", "long")
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
                this.doGetProductByID(req.auth, req.params.id)
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
            .addGet(this.getProducts)
            .addGet(this.getProductByID);
        // .addPut (this.putUserById)
        // .addPost (this.postUserWithQueryParameter)
        // .addPost (this.postUsers)
        // .addDelete (this.deleteUserById)
        swagger.configureDeclaration("Products", {
            description: "Operations about Products",
            produces: ["application/json"]
        });
    }
    ///////////////////////////////////////////////
    ///
    ///  DB access methods
    doGetProducts(auth, limit, offset) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM products";
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
    doGetProductByID(auth, id) {
        return new Promise((resolve, reject) => {
            // req.auth, req.params.username
            let sql = "SELECT * FROM products where pk_productid = $1";
            let params = [id];
            this.pool
                .query(sql, params)
                .then(res => {
                if (res.rows.length == 1) {
                    resolve(res.rows);
                }
                else {
                    reject("No such product");
                }
            })
                .catch(error => {
                console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                reject(error.toString());
            });
        });
    }
}
exports.Products = Products;
//# sourceMappingURL=products.js.map