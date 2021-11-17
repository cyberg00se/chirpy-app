const http = require("http");
const config = require("./config/default").app;

let server = appCallback => http.createServer(appCallback);

module.exports = server;