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
    .addGet (this.getUserById)
    .addPut (this.putUserByName)
    .addPost (this.postUserWithQueryParameter)
    .addPost (this.postUsers)
    .addDelete (this.deleteUserById)
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


  public getUserById = {
    'spec': {
      description : "Operations about Users",
      path : "/users/{id}",
      method: "GET",
      summary : "Get one Users",
      notes : "Returns one User",
      type : "user",
      nickname : "getUserById",
      produces : ["application/json"],
      parameters : [
          swagger.params.path("id", "ID of User", "long")
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
      var id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw swagger.errors.invalid('id');
      }
      this.doGetUserById (req.auth, id)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  public putUserByName = {
    'spec': {
      description : "Operations about Users",
      path : "/users/{id}",
      method: "PUT",
      summary : "Set one User",
      notes : "Returns id",
      type : "id",
      nickname : "putUser",
      produces : ["application/json"],
      parameters : [
        // swagger.params.path ("id", "ID of User", "long"),
        swagger.params.query("username", "Name of new User", "string", true),
        swagger.params.query("passwordhash", "hashed password", "string", false),
        swagger.params.query("isadmin", "only for admins", "boolean", false),
      ],
      responseMessages : [
        { "code": 400, "message": 'invalid parameter' },
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
      if (!req.query.username) {
        throw swagger.errors.invalid('username');
      }
      if (!req.query.passwordhash) {
        throw swagger.errors.invalid('passwordhash');
      }
      this.doPutUserById (req.auth, id, req.query.username, req.query.passwordhash, req.query.isadmin || false)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  public postUserWithQueryParameter = {
    'spec': {
      description : "Operations about Users",
      path : "/users/query",
      method: "POST",
      summary : "Add a new User",
      notes : "Returns UserId",
      type : "id",
      nickname : "postUserWithQueryParameter",
      produces : ["application/json"],
      parameters : [
        swagger.params.query("username", "Name of new User", "string", true),
        swagger.params.query("passwordhash", "hashed password", "string", false),
        swagger.params.query("isadmin", "only for admins", "boolean", false),
      ],
      responseMessages : [
        { "code": 400, "message": 'invalid parameter' },
        // { "code": 404, "message": 'id not found' },
        { "code": 500, "message": 'internal server error'}
      ]
    },
    'action': (req,res) => {
      if (!req.query.username) {
        throw swagger.errors.invalid('username');
      }
      if (!req.query.passwordhash) {
        throw swagger.errors.invalid('passwordhash');
      }
      this.doPostUsers (req.auth, [{username: req.query.username, passwordhash: req.query.passwordhash, isadmin: req.query.isadmin || false}])
      .then (result => res.send(JSON.stringify(result[0])))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  public postUsers = {
    'spec': {
      description : "Operations about Users",
      path : "/users",
      method: "POST",
      summary : "Add a lot of users",
      notes : "Returns an array of ids",
      type : "array",
      items: {
        $ref: "id"
      },
      nickname : "postUser",
      produces : ["application/json"],
      parameters : [
        swagger.params.body("body", 'Array of users as JSON string', "string")
      ],
      responseMessages : [
        { "code": 400, "message": 'invalid parameter' },
        // { "code": 404, "message": 'id not found' },
        { "code": 500, "message": 'internal server error'}
      ]
    },
    'action': (req,res) => {
      this.doPostUsers (req.auth, req.body)
      .then (result => res.send(JSON.stringify(result)))
      .catch (error => res.status(500).send ({
         "code": 500,
         "message": error
      }))
    }
  };

  public deleteUserById = {
    'spec': {
      description : "Operations about Users",
      path : "/users/{id}",
      method: "DELETE",
      summary : "Delete a single User by ID",
      notes : "Returns number of deleted Users",
      type : "count",
      nickname : "deleteUserById",
      produces : ["application/json"],
      parameters : [
        swagger.params.path("id", "ID of User", "long")
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
      this.doDeleteUserById (req.auth, id)
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
      // if (!auth) {
      //   // this cannot happen
      //   reject ("No permissions");
      //   return;
      // }
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




      // if (username) {
      //   let i = this.findFakedUserByName(username);
      //   if (i >= 0) {
      //     resolve ([this.fakedUserDB[i]])
      //   } else {
      //     reject ("No such user");
      //   }
      // } else {
      //   resolve (this.fakedUserDB);
      // }
    });
  }

  public doGetUserById (auth: Types.Auth, id: number) : Promise<Types.User> {
    return new Promise ((resolve, reject) => {
      // TODO: check auth
      let i = this.findFakedUserById (id);
      if (i >= 0) {
        resolve (this.fakedUserDB[i])
      } else {
        reject ("No such user");
      }
    });
  }

  public doPutUserById (auth: Types.Auth, id: number, username: string, passwordhash: string, isadmin: boolean) : Promise<Types.Id> {
    return new Promise ((resolve, reject) => {
      if (!auth) {
        // this cannot happen
        reject ("No permissions");
        return;
      }
      if (this.userIsAdmin (auth.user)) {
        // OK
      } else {
        // ony provide own data
        if (username && username != auth.user) {
          reject ("Not your data");
          return;
        }
        isadmin = false; // :->
      }
      let encoded = crypto.createHash('sha256').update(passwordhash).digest('base64');
      let i = this.findFakedUserById (id);
      if (i >= 0) {
        this.fakedUserDB[i] = {id: id, username: username, passwordhash: encoded, isadmin: isadmin};
      } else {
        this.fakedUserDB.push ({id: id, username: username, passwordhash: encoded, isadmin: isadmin});
      }
      resolve ({id: id});
    });
  }

  public async doPostUsers (auth: Types.Auth, users: Types.User[]) : Promise<Types.Id[]> {
      if (!auth) {
        // this cannot happen
        return Promise.reject ("No permissions");
      }
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

  public doDeleteUserById (auth: Types.Auth, id: number) : Promise<Types.Count> {
    return new Promise ((resolve, reject) => {
      // TODO: auth
      if (1 == id) {
        reject ("I am not brave enough to delete this user");
      } else {
        let found = false;
        for (let i = 0; i < this.fakedUserDB.length; i++) {
          if (id == this.fakedUserDB[i].id) {
            found = true;
            this.fakedUserDB.splice(i, 1);
            resolve ({count: 1});
            return;
          }
        }
        if (!found) {
          reject ("No such user");
        }
      }
    });
  }

  // The real things....
  public doGetUsers_real (auth: Types.Auth, username: string, limit: number, offset: number) : Promise<Types.User[]> {
    return new Promise ((resolve, reject) => {
      // TODO: userIsAdmin(auth.user)
      let sql = "SELECT * FROM users";
      let params: [string | number] = [limit || this.defaultLimit, offset || 0];
      if (username) {
        sql += " where UserName = $3";
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
