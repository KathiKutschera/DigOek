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
                    swagger.params.query("offset", "Use together with 'limit' for paging", "number", false, null, 0),
                    swagger.params.query("groupname", "Name of the productgroup corresponding to the product", "string"),
                    swagger.params.query("groupid", "ID of the productgroup corresponding to the product", "number"),
                    swagger.params.query("name", "Name of the product", "string"),
                    swagger.params.query("status", "NOT CLEAR now", "number"),
                    swagger.params.query("keyword", "keyword inside name or description of a product", "string"),
                ],
                responseMessages: [{
                        "code": 500,
                        "message": 'internal server error'
                    }]
            },
            'action': (req, res) => {
                if (req.query.limit) {
                    let limit = parseInt(req.query.limit);
                    if (isNaN(limit)) {
                        throw swagger.errors.invalid('limit');
                    }
                }
                if (req.query.groupid) {
                    console.log("groupID");
                    let groupid = parseInt(req.query.groupid);
                    if (isNaN(groupid)) {
                        throw swagger.errors.invalid('groupID');
                    }
                }
                this.doGetProducts(req, req.query.limit, req.query.offset)
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
                this.doGetProductByID(req.params.id)
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
    doGetProducts(req, limit, offset) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT products.pk_productid, products.name, products.description, products.soldper, products.price, products.amountavailable, products.vatrate, products.imagename, products.fk_groupid FROM products INNER JOIN productgroups ON pk_groupid=fk_groupid";
            let counter = 0;
            let params = [limit || this.defaultLimit, offset || 0];
            if (req.query.groupname || req.query.groupid || req.query.name || req.query.status || req.query.keyword) {
                sql += " WHERE";
                if (req.query.groupname) {
                    sql += " productgroups.name ILIKE $" + (counter + 3);
                    counter += 1;
                    params.push(req.query.groupname);
                }
                if (req.query.groupid) {
                    if (counter >= 1) {
                        sql += " AND fk_groupid = $" + (counter + 3);
                    }
                    else {
                        sql += " fk_groupid = $" + (counter + 3);
                    }
                    params.push(req.query.groupid);
                    counter += 1;
                }
                if (req.query.name) {
                    if (counter >= 1) {
                        sql += " AND products.name ~ $" + (counter + 3);
                    }
                    else {
                        sql += " products.name ~ $" + (counter + 3);
                    }
                    params.push(req.query.name + '*');
                    counter += 1;
                }
                if (req.query.keyword) {
                    if (counter >= 1) {
                        sql += " AND products.description ~ $" + (counter + 3) + " OR products.name ~ $" + (counter + 3);
                    }
                    else {
                        sql += " products.description ~ $" + (counter + 3) + " OR products.name ~ $" + (counter + 3);
                    }
                    params.push(req.query.keyword + '*');
                    counter += 1;
                }
                if (req.query.status) {
                    let status = req.query.status;
                    console.log(status.toUpperCase());
                    if (status.toUpperCase() === "STOCK") {
                        if (counter >= 1) {
                            sql += " AND amountavailable > 0";
                        }
                        else {
                            sql += " amountavailable > 0";
                        }
                    }
                    else {
                        if (counter >= 1) {
                            sql += " AND amountavailable >= 0";
                        }
                        else {
                            sql += " amountavailable >= 0";
                        }
                    }
                }
            }
            sql += " ORDER BY fk_groupid, pk_productid LIMIT $1 OFFSET $2";
            console.log(sql);
            console.log(params);
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
    doGetProductByID(id) {
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