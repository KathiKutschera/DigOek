// user registration

// req, res types
import * as express from 'express';
// DB access
import * as pg from 'pg';

// shared datatypes
import * as Types from "./types";

// Needed for password check
import * as crypto from 'crypto';

export class Register {

  constructor (private pool, private users, private app) {
  }

  public mount (): void {
    this.app.post(/^\/register\/users\/?$/, (req, res, next) => this.doRegister (req, res));
 }


// TODO: implement doRegister (req, res) --> DB
private doRegister (req: Request, res: Response) {
  // IMPORTANT: call res.end() when done
  // be sure not to OVERWRITE existing users (Only INSTERT, not UPDATE)

  let sql = "";
  let params = []
 this.pool
  .query (sql, params)
  .then (result => { res.send(JSON.stringify(result)); res.end()} )  // IMPORTANT res.end()
  .catch (error => { res.status(500).send ({
     "code": 500,
     "message": error
  });
  res.end();   // IMPORTANT
  });
}


}
