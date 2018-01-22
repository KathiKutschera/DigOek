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

// To produce xml - lib does not work
// import * as xml from 'xml';
// js2xml can't be npm installed in windows - dependencies not available
import * as jsontoxml from 'jsontoxml';

export class Users {

  private defaultLimit : number = 100;
  private defaultOffset = 0;

  constructor (private pool) {
  }

  public mount () {
    swagger
    .addGet (this.getUsers)
    .addGet (this.getUserByUserName)
    .addPut (this.putUserByUserName)
    // .addPost (this.postUserWithQueryParameter)
    // .addPost (this.postUsers)
    .addDelete (this.deleteUserByUserName)
    swagger.configureDeclaration("Users", {
        description : "Operations about Users",
        // authorizations : ["oauth2"],
        produces: ["application/json"]
    });
  }




  ///////////////////////////////////////////////
  ///
  ///  REST method descriptions

  public getUsers = {
    'spec': {
      description : "Operations about Users",
      path : "/users",
      method: "GET",
      summary : "Get all Users",
      notes : "Returns Users",
      type : "array",
      items: {
        $ref: "user"
      },
      nickname : "getUsers",
      produces : ["application/json", "application/xml"],
      parameters : [
        swagger.params.query ("username", "Name of User to be fetched", "string", false),
        swagger.params.query ("limit", "Limit number of results", "number", false, null, this.defaultLimit),
        swagger.params.query ("offset", "Use together with 'limit' for paging", "number", false, null, 0)
        ],
      responseMessages : [{
        "code": 500,
        "message": 'internal server error'
      }]
    },
    'action': (req,res) => {
      let wantXML = req.headers.hasOwnProperty ("accept") && (req.headers.accept == "application/xml");
      this.doGetUsers (req, req.query.username, req.query.limit, req.query.offset)
      .then (result => {
        if (wantXML) {
          // reorganize json
          let r = [];
          for (let i = 0; i < result.length; i++) { r.push ({user: result[i]})};
          res.set('Content-Type', 'application/xml').send(jsontoxml({users: r}, {xmlHeader: true}));
        } else {
          res.send(JSON.stringify(result))
        }
      })
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };


  public getUserByUserName = {
    'spec': {
      description : "Operations about Users",
      path : "/users/{username}",
      method: "GET",
      summary : "Get one User",
      notes : "Returns one User",
      type : "user",
      nickname : "getUserByUserName",
      produces : ["application/json"],
      parameters : [
          swagger.params.path("username", "UserName of User", "string")
        ],
      responseMessages : [
        { "code": 400, "message": 'invalid name' },
        // { "code": 404, "message": 'id not found' },
        { "code": 500, "message": 'internal server error'}
      ]
    },
    'action': (req,res) => {
      if (!req.params.username) {
        throw swagger.errors.invalid('username');
      }
      // var id = parseInt(req.params.id);
      // if (isNaN(id)) {
      //   throw swagger.errors.invalid('id');
      // }
      this.doGetUserByUserName (req)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  public putUserByUserName = {
    'spec': {
      description : "Operations about Users",
      path : "/users/{username}",
      method: "PUT",
      summary : "Set one User",
      notes : "Returns username",
      type : "username",
      nickname : "putUser",
      produces : ["application/json"],
      parameters : [
        swagger.params.path ("username", "UserName of User", "string"),
        swagger.params.body("body", 'User as JSON string', "string")
      ],
      responseMessages : [
        { "code": 400, "message": 'invalid parameter' },
        // { "code": 404, "message": 'id not found' },
        { "code": 500, "message": 'internal server error'}
      ]
    },
    'action': (req,res) => {
      if (!req.params.username) {
        throw swagger.errors.invalid('username');
      }
      console.log(JSON.stringify(swagger.params.body, null, 2));
      this.doPutUserByUserName (req)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  // public postUsers = {
  //   'spec': {
  //     description : "Operations about Users",
  //     path : "/users",
  //     method: "POST",
  //     summary : "Add a lot of users",
  //     notes : "Returns an array of ids",
  //     type : "array",
  //     items: {
  //       $ref: "id"
  //     },
  //     nickname : "postUser",
  //     produces : ["application/json"],
  //     parameters : [
  //       swagger.params.body("body", 'Array of users as JSON string', "string")
  //     ],
  //     responseMessages : [
  //       { "code": 400, "message": 'invalid parameter' },
  //       // { "code": 404, "message": 'id not found' },
  //       { "code": 500, "message": 'internal server error'}
  //     ]
  //   },
  //   'action': (req,res) => {
  //     this.doPostUsers (req.auth, req.body)
  //     .then (result => res.send(JSON.stringify(result)))
  //     .catch (error => res.status(500).send ({
  //        "code": 500,
  //        "message": error
  //     }))
  //   }
  // };

  public deleteUserByUserName = {
    'spec': {
      description : "Operations about Users",
      path : "/users/{username}",
      method: "DELETE",
      summary : "Delete a single User by ID",
      notes : "Returns user which was deleteded",
      type : "user",
      nickname : "deleteUserByUserName",
      produces : ["application/json"],
      parameters : [
        swagger.params.path("username", "UserName of User", "string")
      ],
      responseMessages : [
        { "code": 400, "message": 'invalid username' },
        // { "code": 404, "message": 'id not found' },
        { "code": 500, "message": 'internal server error'}
      ]
    },
    'action': (req,res) => {
      if (!req.params.username) {
        throw swagger.errors.invalid('username');
      }
      this.doDeleteUserByUserName (req)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  }



  ///////////////////////////////////////////////
  ///
  ///  DB access methods

  // private fakedUserDB = [
  //   // valid ids starts from 1
  //   {id: 1, username: "admin", passwordhash: 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=', isadmin: true }, // 'admin' :-)
  // ];
  //
  // private findFakedUserById (id: number): number {
  //   for (let i = 0; i < this.fakedUserDB.length; i++) {
  //     if (id == this.fakedUserDB[i].id) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
  //
  // private findFakedUserByName (username: string):number {
  //   for (let i = 0; i < this.fakedUserDB.length; i++) {
  //     if (username == this.fakedUserDB[i].username) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }


  public doGetUsers (req: Request, username: string, limit: number, offset: number) : Promise<Types.User[]> {
    return new Promise ((resolve, reject) => {
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      if (this.userIsAdmin (req)) {
        // OK
      } else {
        // only provide own data
        if (username && username != req.auth.user) {
          reject ("Not your data");
          return;
        }
        // restrict to own data
        username = req.auth.user;
      }
      let sql = "SELECT * FROM users";
      let params: [string | number] = [limit || this.defaultLimit, offset || 0];
      if (username) {
        sql += " where pk_userName = $3";
        params.push (username);
      }
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

  public doGetUserByUserName (req: Request) : Promise<Types.User> {
    return new Promise ((resolve, reject) => {
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      // req.auth, req.params.username
      if (this.userIsAdmin (req)) {
        // OK
      } else {
        // only provide own data
        if (req.params.username && req.params.username != req.auth.user) {
          reject ("Not your data");
          return;
        }
        // // restrict to own data
        // username = req.auth.user;
      }
      let sql = "SELECT * FROM users where pk_username = $1";
      let params: [string | number] = [req.params.username];
      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length == 1){
          resolve (res.rows);
        } else {
            reject ("No such user");
          }
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
        reject (error.toString());
      });
    });
  }

  public doPutUserByUserName (req: Request) : Promise<Types.Id> {
    return new Promise ((resolve, reject) => {
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      if (this.userIsAdmin (req)) {
        // OK
      } else {
        // only provide own data
        if (req.params.username && req.params.username != req.auth.user) {
          reject ("Not your data");
          return;
        }
        req.body.isadmin = false;
      }

      let requiredFields = ["email", "name", "surname", "billingaddress", "deliveryaddress"];

      for(let i = 0; i < requiredFields.length; i++){
        if(! req.body.hasOwnProperty(requiredFields[i])){
          reject(`Missing field: ${requiredFields[i]}` );
          return;
        }
      }

      let sql1 = "UPDATE users SET";
      let sql2 = "INSERT INTO users(";
      let params = [];

      let allFields = ["pwhash", "email", "isadmin", "name", "surname", "companyname", "billingaddress", "deliveryaddress", "vat", "nameoncc", "creditcardnr", "validyear", "validmonth", "ccv"];
      let i = 0;
      for(; i < allFields.length; i++){
        if(req.body.hasOwnProperty(allFields[i])){
          if(i != 0){
            sql1 += `, `;
            sql2 += `, `;
          }
          sql1 += ` ${allFields[i]} = $${i+1}` ;
          sql2 += ` ${allFields[i]}`;
          if(allFields[i] == "pwhash"){
            params.push(crypto.createHash('sha256').update(req.body[allFields[i]]).digest('base64'));
          } else {
            params.push(req.body[allFields[i]]);
          }
        }
      }

      sql2 += `, pk_username) SELECT `;
      for(let j = 0; j < i; j++){
        if(j != 0){
          sql2 += `, `;
        }
        sql2 += `$${j+1}`;
      }

      sql1 += ` WHERE pk_username = $${i+1};`;
      sql2 += ` , CAST($${i+1} as VARCHAR) WHERE NOT EXISTS (SELECT 1 FROM users WHERE pk_username = $${i+1});`;

      params.push(req.params.username);

      console.log(sql1);
      console.log(sql2);
      console.log(JSON.stringify(params));

      this.pool
        .query(sql1, params)
        .catch (error => {
          console.error(sql1 + " with params "+JSON.stringify (params) + ": " + error.toString());
          reject (error.toString());
        })
        .then ( _ => this.pool.query (sql2, params))
        .catch ( error => {
          console.error(sql2 + " with params "+JSON.stringify (params) + ": " + error.toString());
          reject (error.toString());
        })
        .then ( _ => resolve ({"pk_username": req.params.username}))
      });
    }

  public async doPostUsers (auth: Types.Auth, users: Types.User[]) : Promise<Types.Id[]> {
      // if (!auth) {
      //   // this cannot happen
      //   return Promise.reject ("No permissions");
      // }
      let admin = this.userIsAdmin (auth.user);
      let maxid = 0;
      for (let i = 0; i < this.fakedUserDB.length; i++) {
        maxid = Math.max (maxid, this.fakedUserDB[i].id);
      }
      let ids : Types.Id[] = [];
      for (let u = 0; u < users.length; u++){
        maxid++;
        ids.push (
          await this.doPutUserById (auth, maxid, users[u].username, users[u].passwordhash, users[u].isadmin && admin)
        );
      }
      return Promise.resolve (ids);
  }

  public doDeleteUserByUserName (req: Request) : Promise<Types.Count> {
    return new Promise ((resolve, reject) => {
      if (! req.hasOwnProperty ('auth')) {
        return reject ("Not logged in");
      }
      if (this.userIsAdmin (req)) {
        // OK
      } else {
        // only provide own data
        if (req.params.username && req.params.username != req.auth.user) {
          reject ("Not your data");
          return;
        }
        // req.body.isadmin = false;
      }

      // // get amount of not paid orders
      // let sql1 = "SELECT COUNT(paymentstate) FROM orders WHERE orders.fk_username = $1 AND paymentstate = 'open'";
      // let params1 : [string] = [req.params.username];
      // this.pool
      // .query (sql1, params1)
      // .then (res => {
      //   if(res.rows.length == 1){
      //     console.log(res.rows[0].count);
      //     if(res.rows[0].count == 0){
      //       // delete user
      //     } else {
      //     reject ("There are open bills. User cannot be deleted when having open bills.")
      //     return;
      //   }
      //   } else {
      //       reject ("No such user");
      //       return;
      //     }
      // })
      // .catch (error => {
      //   console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
      //   reject (error.toString());
      //   return;
      // });
      // DELETE FROM users where pk_username='paul.meier' AND (SELECT COUNT(paymentstate) FROM users JOIN orders ON (users.pk_username = orders.fk_username) where users.pk_username = 'paul.meier' and paymentstate='open') = 0;

      // DELETE FROM users where pk_username='hubers.restaurant' and (SELECT COUNT(paymentstate) FROM users JOIN orders ON (users.pk_username = orders.fk_username) where users.pk_username = 'hubers.restaurant' and paymentstate='open') = 0;

      let sql = "DELETE FROM users where pk_username = $1 AND (SELECT COUNT(paymentstate) FROM users JOIN orders ON (users.pk_username = orders.fk_username) WHERE users.pk_username = $1 and paymentstate='open') = 0 RETURNING *";
      let params: [string | number] = [req.params.username];
      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length == 1){
          resolve (res.rows);
        } else {
            reject ("Either the user does not exist or there are open bills. User cannot be deleted when having open bills.");
          }
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
        reject (error.toString());
      });
    });
  }


  ///////////////////////////////////////////////
  ///
  ///  password check, admin check

  public userIsAdmin (req) : boolean {
    if (req.hasOwnProperty ('restuser') && req['restuser'].hasOwnProperty( ("isAdmin"))) {
      console.log (`userIsAdmin: ${req['restuser']['isAdmin']}`);
      return req['restuser']['isAdmin'];
    } else {
      console.log (`userIsAdmin: false`);
      return false;
    }
  }

  public getUserDetail (auth : Types.Auth) : Promise<Types.UserDetails> {
    return new Promise ((resolve, reject) => {
      // do some db access
      // Fake it!
      // let i = this.findFakedUserByName(auth.user);
      let sql = "SELECT surname, isadmin FROM users where pk_userName = $1";
      let params: [string | number] = [auth.user];
      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length == 1){
          resolve ({surname: res.rows[0].surname, isAdmin: res.rows[0].isadmin});
        } else {
          reject("No such user.");
        }
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
          reject(error.toString());
      });
    });
  }

  public authorizer = (user, password, authorize) => {
    if (!user) {
      // no username
      authorize(null, false); // error string instead of null?
    } else {
      let sql = "SELECT pwHash FROM users where pk_userName = $1";
      let params: [string | number] = [user];
      this.pool
      .query (sql, params)
      .then (res => {
        if(res.rows.length == 1){
          let encoded = crypto.createHash('sha256').update(password).digest('base64');
          console.log("res.rows: " + JSON.stringify(res.rows, null, 2));
          console.log("encoded: " + encoded);

          if (res.rows[0].pwhash == encoded) {
            console.log("yay");
                authorize(null, true);
          } else {
            // incorrect password
            authorize(null, false); // error string instead of null?
          }
        } else {
          // incorrect username
          authorize(null, false); // error string instead of null?
        }
      })
      .catch (error => {
        console.error(sql + " with params "+JSON.stringify (params)+": " + error.toString());
          authorize(null, false); // error string instead of null?
      });
    }
  }

}
