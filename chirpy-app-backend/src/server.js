const config = require("./config/default");
const fs = require("fs");

let server;

if(config.tls.enabled) {
    console.info("Enabled TLS");

    const tlsOptions = {
        cert: config.tls.usePlain
            ? config.tls.plainCert
            : fs.readFileSync(config.tls.cert),
        key: config.tls.usePlain
            ? config.tls.plainKey
            : fs.readFileSync(config.tls.key),
        dhparam: fs.readFileSync(config.tls.dhparam),
        minVersion: config.tls.minVersion,
        maxVersion: config.tls.maxVersion,
        passphrase: process.env.TLSPASS,
    };

    if(config.tls.useHttp2) {
        console.info("Enabled http2 protocol");

        const http2 = require("http2");
        server = appCallback => http2.createServer(tlsOptions, appCallback);
    } else {
        const https = require("https");
        server = appCallback => https.createServer(tlsOptions, appCallback);
    }
} else {
    const http = require("http");
    server = appCallback => http.createServer(appCallback);
}

module.exports = server;