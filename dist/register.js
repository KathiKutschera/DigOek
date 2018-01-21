"use strict";
// user registration
Object.defineProperty(exports, "__esModule", { value: true });
const swagger = require("swagger-node-express");
class Register {
    constructor(pool, users) {
        this.pool = pool;
        this.users = users;
        ///////////////////////////////////////////////
        ///
        ///  REST method descriptions
        this.postRegister = {
            'spec': {
                description: "Operations about Registration",
                path: "/register",
                method: "POST",
                summary: "Post a new Registration",
                notes: "Returns username",
                type: "user",
                items: {
                    $ref: "user"
                },
                nickname: "postRegister",
                produces: ["application/json"],
                parameters: [
                    // swagger.params.query ("username", "Name of User to be fetched", "string", false),
                    // swagger.params.query ("limit", "Limit number of results", "number", false, null, this.defaultLimit),
                    // swagger.params.query ("offset", "Use together with 'limit' for paging", "number", false, null, 0)
                    swagger.params.body("body", "User as JSON string", "string")
                ],
                responseMessages: [{
                        "code": 500,
                        "message": 'internal server error'
                    }]
            },
            'action': (req, res) => {
                this.doPostRegister(req)
                    .then(result => {
                    res.send(JSON.stringify(result));
                })
                    .catch(error => res.status(500).send({
                    "code": 500,
                    "message": error
                }));
            }
        };
    }
    mount() {
        swagger
            .addPost(this.postRegister);
        swagger.configureDeclaration("Register", {
            description: "Operations about Registration",
            produces: ["application/json"]
        });
    }
    ///////////////////////////////////////////////
    ///
    ///  DB access methods
    doPostRegister(req) {
        return new Promise((resolve, reject) => {
            // be sure not to OVERWRITE existing users (Only INSTERT, not UPDATE)
            let sql = "";
            let params = [];
            this.pool
                .query(sql, params)
                .then(res => {
                if (res.rows.length == 1) {
                    resolve(res.rows);
                }
                else {
                    reject("Failed");
                }
            })
                .catch(error => {
                console.error(sql + " with params " + JSON.stringify(params) + ": " + error.toString());
                reject(error.toString());
            });
        });
    }
}
exports.Register = Register;
//# sourceMappingURL=register.js.map