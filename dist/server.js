"use strict";
/**
* This is the main program
*/
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const deb = require("debug");
const http = require("http");
const Application_1 = require("./Application");
// add content of .env to environment variables
const env = dotenv.config();
var debug = deb('rest:server');
var port = normalizePort(process.env.PORT || '8088');
let application = new Application_1.Application(port);
/**
* Create HTTP server -- see express documentation.
*/
var server = http.createServer(application.app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
* Normalize a port into a number, string, or false.
*/
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
* Event listener for HTTP server "error" event.
*/
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
* Event listener for HTTP server "listening" event.
*/
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    // debug('Listening on ' + bind);
    console.log("Webserver started at " + bind);
}
//# sourceMappingURL=server.js.map