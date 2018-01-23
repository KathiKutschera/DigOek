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
        this.putProductById = {
            'spec': {
                description: "Operations about Products",
                path: "/products/{id}",
                method: "PUT",
                summary: "Set one Product",
                notes: "Returns productid",
                type: "id",
                nickname: "putProduct",
                produces: ["application/json"],
                parameters: [
                    swagger.params.path("id", "ID of Product", "string"),
                    swagger.params.body("body", 'User as JSON string', "string")
                ],
                responseMessages: [
                    { "code": 404, "message": 'id not found' },
                    { "code": 500, "message": 'internal server error' }
                ]
            },
            'action': (req, res) => {
                if (!req.params.id) {
                    throw swagger.errors.invalid('id');
                }
                console.log(JSON.stringify(swagger.params.body, null, 2));
                this.doPutProductById(req)
                    .then(result => res.send(JSON.stringify(result)))
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        this.postProduct = {
            'spec': {
                description: "Operations about Products",
                path: "/products",
                method: "POST",
                summary: "Creates a new Product",
                notes: "Returns productid",
                type: "product",
                nickname: "postProduct",
                produces: ["application/json"],
                parameters: [
                    swagger.params.body("body", 'User as JSON string', "string")
                ],
                responseMessages: [
                    { "code": 500, "message": 'internal server error' }
                ]
            },
            'action': (req, res) => {
                console.log(JSON.stringify(swagger.params.body, null, 2));
                this.doPostProduct(req)
                    .then(result => res.send(JSON.stringify(result)))
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        this.deleteProductById = {
            'spec': {
                description: "Operations about Products",
                path: "/products/{id}",
                method: "DELETE",
                summary: "delete the selected Product",
                notes: "Returns number of deleted Products",
                type: "count",
                nickname: "deleteProducts",
                produces: ["application/json"],
                parameters: [
                    swagger.params.path("id", "id of Product", "long")
                ],
                responseMessages: [{
                        "code": 500,
                        "message": 'internal server error'
                    }]
            },
            'action': (req, res) => {
                this.doDeleteProduct(req)
                    .then(result => {
                    res.send(JSON.stringify(result));
                })
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        ///////Groups
        this.getProductGroups = {
            'spec': {
                description: "Operations about ProductGroups",
                path: "/groups",
                method: "GET",
                summary: "Get all ProductGroups",
                notes: "Returns all ProductGroups",
                type: "group",
                nickname: "getProductGroups",
                produces: ["application/json"],
                parameters: [],
                responseMessages: [
                    { "code": 500, "message": 'internal server error' }
                ]
            },
            'action': (req, res) => {
                this.doGetProductGroups(req)
                    .then(result => res.send(JSON.stringify(result)))
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        this.getProductGroupById = {
            'spec': {
                description: "Operations about ProductGroups",
                path: "/groups/{id}",
                method: "GET",
                summary: "Get one ProductGroup",
                notes: "Returns one ProductGroup",
                type: "group",
                nickname: "getProductGroupByID",
                produces: ["application/json"],
                parameters: [
                    swagger.params.path("id", "ID of the group", "long")
                ],
                responseMessages: [
                    { "code": 400, "message": 'invalid id' },
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
                this.doGetProductGroupByID(req.params.id)
                    .then(result => res.send(JSON.stringify(result)))
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        this.putProductGroupById = {
            'spec': {
                description: "Operations about ProductGroups",
                path: "/groups/{id}",
                method: "PUT",
                summary: "Set one ProductGroup",
                notes: "Returns groupid",
                type: "id",
                nickname: "putProductGroup",
                produces: ["application/json"],
                parameters: [
                    swagger.params.path("id", "ID of ProductGroup", "string"),
                    swagger.params.body("body", 'User as JSON string', "string")
                ],
                responseMessages: [
                    { "code": 404, "message": 'id not found' },
                    { "code": 500, "message": 'internal server error' }
                ]
            },
            'action': (req, res) => {
                if (!req.params.id) {
                    throw swagger.errors.invalid('id');
                }
                console.log(JSON.stringify(swagger.params.body, null, 2));
                this.doPutProductGroupById(req)
                    .then(result => res.send(JSON.stringify(result)))
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
        this.postProductGroup = {
            'spec': {
                description: "Operations about ProductGroups",
                path: "/groups",
                method: "POST",
                summary: "Creates a new ProductGroup",
                notes: "Returns groupid",
                type: "group",
                nickname: "postProductGroup",
                produces: ["application/json"],
                parameters: [
                    swagger.params.body("body", 'User as JSON string', "string")
                ],
                responseMessages: [
                    { "code": 500, "message": 'internal server error' }
                ]
            },
            'action': (req, res) => {
                console.log(JSON.stringify(swagger.params.body, null, 2));
                this.doPostProductGroup(req)
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
            .addGet(this.getProductByID)
            .addGet(this.getProductGroupById)
            .addGet(this.getProductGroups)
            .addPut(this.putProductById)
            .addPut(this.putProductGroupById)
            .addPost(this.postProduct)
            .addPost(this.postProductGroup)
            .addDelete(this.deleteProductById);
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
    doPutProductById(req) {
        return new Promise((resolve, reject) => {
            if (!req.hasOwnProperty('auth')) {
                return reject("Not logged in");
            }
            if (this.users.userIsAdmin(req)) {
                // OK
                let sql = "UPDATE products SET";
                let params = [];
                let allFields = ["name", "description", "soldper", "price", "amountavailable", "vatrate", "imagename", "fk_groupid"];
                let i = 0;
                let j = 0;
                for (; i < allFields.length; i++) {
                    if (req.body.hasOwnProperty(allFields[i])) {
                        if (j != 0) {
                            sql += `, `;
                        }
                        sql += ` ${allFields[i]} = $${j + 1}`;
                        params.push(req.body[allFields[i]]);
                        j += 1;
                    }
                }
                params.push(req.params.id);
                sql += ` WHERE pk_productid = $` + (j + 1) + ';';
                console.log("ITISI" + sql);
                this.pool
                    .query(sql, params)
                    .then(_ => resolve({ "pk_productid": req.params.id }))
                    .catch(error => {
                    console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                    reject(error.toString());
                });
            }
            else {
                reject("You have no rights for that action");
                return;
            }
        });
    }
    doPostProduct(req) {
        return new Promise((resolve, reject) => {
            if (!req.hasOwnProperty('auth')) {
                return reject("Not logged in");
            }
            if (this.users.userIsAdmin(req)) {
                // OK
                let requiredFields = ["name", "soldper", "price", "amountavailable", "vatrate", "fk_groupid"];
                for (let i = 0; i < requiredFields.length; i++) {
                    if (!req.body.hasOwnProperty(requiredFields[i])) {
                        reject(`Missing field: ${requiredFields[i]}`);
                        return;
                    }
                }
                let sql = "INSERT INTO products(pk_productid,";
                let params = [];
                let allFields = ["name", "description", "soldper", "price", "amountavailable", "vatrate", "imagename", "fk_groupid"];
                let i = 0;
                let k = 0;
                for (; i < allFields.length; i++) {
                    if (req.body.hasOwnProperty(allFields[i])) {
                        if (k != 0) {
                            sql += `, `;
                        }
                        sql += ` ${allFields[i]}`;
                        params.push(req.body[allFields[i]]);
                        k += 1;
                    }
                }
                sql += `) VALUES( DEFAULT, `;
                for (let j = 0; j < params.length; j++) {
                    if (j != 0) {
                        sql += `, `;
                    }
                    sql += `$${j + 1}`;
                }
                sql += `) RETURNING pk_productid`;
                this.pool
                    .query(sql, params)
                    .then(res => resolve(res.rows))
                    .catch(error => {
                    console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                    reject(error.toString());
                });
            }
            else {
                // only provide own data
                if (req.params.username && req.params.username != req.auth.user) {
                    reject("Not your data");
                    return;
                }
                req.body.isadmin = false;
            }
        });
    }
    doDeleteProduct(req) {
        return new Promise((resolve, reject) => {
            if (!req.hasOwnProperty('auth')) {
                return reject("Not logged in");
            }
            //check if Admin
            if (this.users.userIsAdmin(req)) {
                // OK
                let sql = "DELETE FROM products where pk_productid = $1 RETURNING *";
                let params = [req.params.id];
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
            }
            else {
                reject("Not your data");
                return;
            }
        });
    }
    //Groups
    doGetProductGroupByID(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM productgroups where pk_groupid = $1";
            let params = [id];
            this.pool
                .query(sql, params)
                .then(res => {
                if (res.rows.length == 1) {
                    resolve(res.rows);
                }
                else {
                    reject("No such productgroup");
                }
            })
                .catch(error => {
                console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                reject(error.toString());
            });
        });
    }
    doGetProductGroups(req) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM productgroups";
            let params = [];
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
    doPutProductGroupById(req) {
        return new Promise((resolve, reject) => {
            if (!req.hasOwnProperty('auth')) {
                return reject("Not logged in");
            }
            if (this.users.userIsAdmin(req)) {
                // OK
                let sql = "UPDATE productgroups SET";
                let params = [];
                let allFields = ["description", "name", "iconclass"];
                let i = 0;
                let j = 0;
                for (; i < allFields.length; i++) {
                    if (req.body.hasOwnProperty(allFields[i])) {
                        if (j != 0) {
                            sql += `, `;
                        }
                        sql += ` ${allFields[i]} = $${j + 1}`;
                        params.push(req.body[allFields[i]]);
                        j += 1;
                    }
                }
                params.push(req.params.id);
                sql += ` WHERE pk_groupid = $` + (j + 1) + ';';
                this.pool
                    .query(sql, params)
                    .then(_ => resolve({ "pk_groupid": req.params.id }))
                    .catch(error => {
                    console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                    reject(error.toString());
                });
            }
            else {
                reject("You have no rights for that action");
                return;
            }
        });
    }
    doPostProductGroup(req) {
        return new Promise((resolve, reject) => {
            if (!req.hasOwnProperty('auth')) {
                return reject("Not logged in");
            }
            if (this.users.userIsAdmin(req)) {
                // OK
                let requiredFields = ["name"];
                for (let i = 0; i < requiredFields.length; i++) {
                    if (!req.body.hasOwnProperty(requiredFields[i])) {
                        reject(`Missing field: ${requiredFields[i]}`);
                        return;
                    }
                }
                let sql = "INSERT INTO productgroups(pk_groupid,";
                let params = [];
                let allFields = ["description", "name", "iconclass"];
                let i = 0;
                let k = 0;
                for (; i < allFields.length; i++) {
                    if (req.body.hasOwnProperty(allFields[i])) {
                        if (k != 0) {
                            sql += `, `;
                        }
                        sql += ` ${allFields[i]}`;
                        params.push(req.body[allFields[i]]);
                        k += 1;
                    }
                }
                sql += `) VALUES( DEFAULT, `;
                for (let j = 0; j < params.length; j++) {
                    if (j != 0) {
                        sql += `, `;
                    }
                    sql += `$${j + 1}`;
                }
                sql += `) RETURNING pk_groupid`;
                this.pool
                    .query(sql, params)
                    .then(res => resolve(res.rows))
                    .catch(error => {
                    console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                    reject(error.toString());
                });
            }
            else {
                // only provide own data
                if (req.params.username && req.params.username != req.auth.user) {
                    reject("Not your data");
                    return;
                }
                req.body.isadmin = false;
            }
        });
    }
}
exports.Products = Products;
//# sourceMappingURL=products.js.map