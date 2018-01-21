"use strict";
// user registration
Object.defineProperty(exports, "__esModule", { value: true });
class Register {
    constructor(pool, users, app) {
        this.pool = pool;
        this.users = users;
        this.app = app;
    }
    mount() {
        this.app.post(/^\/register\/users\/?$/, (req, res, next) => this.doRegister(req, res));
    }
    // TODO: implement doRegister (req, res) --> DB
    doRegister(req, res) {
        // IMPORTANT: call res.end() when done
        // be sure not to OVERWRITE existing users (Only INSTERT, not UPDATE)
        let sql = "";
        let params = [];
        this.pool
            .query(sql, params)
            .then(result => { res.send(JSON.stringify(result)); res.end(); }) // IMPORTANT res.end()
            .catch(error => {
            res.status(500).send({
                "code": 500,
                "message": error
            });
            res.end(); // IMPORTANT
        });
    }
}
exports.Register = Register;
//# sourceMappingURL=register.js.map