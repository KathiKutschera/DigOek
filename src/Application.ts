import * as express from 'express';
//
import * as url from "url";
import * as swagger from "swagger-node-express";
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as serveIndex from 'serve-index';
import * as glob from "glob";
import * as basicAuth from 'express-basic-auth';

// DB access pool
import * as pg from 'pg';

// shared datatypes
import * as Types from "./types";
// shared models
import * as models from "./models";

import { Users } from "./users";
import { Products } from "./products";

export class Application {

  public app;
  private pool;
  private users; // needed for login

  constructor (port: number) {

    // Prepare DB access
    let config = {
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'passwd',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'db1',
      max: 10, // max number of clients in pool
      idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
    };
    this.pool = new pg.Pool (config);

    // This is needed early!
    this.users = new Users (this.pool);

    this.app = express();

    // Some configs...
    this.app.set ('port', port);
    this.app.use (cors());
    // uncomment after placing your favicon in /public
    this.app.use(favicon(__dirname + '/../public/favicon.ico'));
    this.app.enable('trust proxy');  // use X-Forwarded-For in logging
    // app.use(logger('short'));
    this.app.use(logger(':date[iso] :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // this.app.use(cookieParser()); // removed because of https://www.npmjs.com/package/express-session


    this.app.use(session({
      key: 'user-sid',
      secret: 'yjdghvy',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
      // cookie: { secure: true } // See https://www.npmjs.com/package/express-session, needs https; works with proxy if
    }));

    this.mountPublic();

    // Couple the application to the Swagger module.
    let subpath = express();
    this.app.use ('/rest', subpath);
    swagger.setAppHandler(subpath);

    // only for the REST subpath!
    // from here on available: req.auth: {user: string, password: string}
    subpath.use(
        basicAuth({
          authorizeAsync: true,
          authorizer: this.users.authorizer,
          unauthorizedResponse: this.getUnauthorizedResponse,
          challenge: true,
          realm: 'MyRESTservice'
      }));

      subpath.use( (req, res, next) => {
        // get userdetails to be easy available later
        this.users.getUserDetail (req.auth)
        // .then ( result => req['restuser'] = result )
        .then ( result => {
          console.log (`set req.restuser: ${JSON.stringify (result)}`);
          req['restuser'] = result;
          next(); // <-- important!
        })
        .catch ( err => {
          console.error (`Error getting user details from DB: ${err}`);
          next(); // <-- important!
        });
        // from here on use req.restuser.isAdmin (or other fields)
        // or simpler: users.userIsAdmin (req) : boolean
      });

    swagger.addModels(models);

    /////////////////////////////////////////////////////
    ///
    ///   ALL PARTS !!
    ///
    /////////////////////////////////////////////////////

    // Add methods to swagger
    // repeate for each of the files
    // only the users need to be saved in a varible - needed for login

    // users is special as it is needed for auth
    this.users.mount();

    // in general:
    // pool to access db
    // users to have users.isUserAdmin (name):boolean
    //   new Whatever(this.pool, this.users).mount();

    new Products(this.pool, this.users).mount();

    // .... and so on ...

    /////////////////////////////////////////////////////
    ///
    ///   END ALL PARTS !!
    ///
    /////////////////////////////////////////////////////
    //
    // app.use(basicAuth(options), (req: basicAuth.IBasicAuthedRequest, res, next) => {
    //     res.end(`Welcome ${req.auth.user} (your password is ${req.auth.password})`)
    //     next()
    // })



    // set  api info
    swagger.setApiInfo({
      title: "'We Love Food' REST service ",
      description: "This is a REST service for Webshop 'We Love Food'",
      // termsOfServiceUrl: "http://example.at/",
      // contact: "admin@example.com",
      license: "Apache 2.0",
      licenseUrl: "http://www.apache.org/licenses/LICENSE-2.0.html"
    });

    // Configures the app's base path and api version.
    swagger.configureSwaggerPaths("", "api-docs", "")
    swagger.configure("/rest", "1.0.0");


    this.mountMisc();
  }

  private mountPublic(): void {
    this.app.use('/public', express.static(path.join(__dirname, '/../public')));
    this.app.use('/public', serveIndex (path.join(__dirname, '/../public'), {icons: true}));
  }

  private mountMisc (): void {
    // Serve up swagger ui at /docs via static route
    let docs_handler = express.static(__dirname + '/../docs/');
    this.app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
      if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
        res.writeHead(302, { 'Location' : req.url + '/' });
        res.end();
        return;
      }
      // take off leading /docs so that connect locates file correctly
      req.url = req.url.substr('/docs'.length);
      return docs_handler(req, res, next);
    });

    // Redirect
    this.app.get ('/', function (req, res) {
      //  to swagger docu
      // res.redirect ('/docs/')
      //  to GUI
      res.redirect ('/public/')
    });
  };


  private getUnauthorizedResponse (req) : string {
      return req.auth ?
          ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') :
          'No credentials provided'
  }

}
