module.exports = {
  app: {
    jwtSecret: "",
    domain: "http://localhost",

    port: 3000,
  },

  tls: {
    enabled: true,

    usePlain: false,
    redirect: false,
    useHttp2: false,

    cert: "../secure/server/cert.pem",
    key: "../secure/server/key.pem",

    plainCert: "",
    plainKey: "",

    minVersion: "TLSv1.3",
    maxVersion: "TLSv1.3",

    dhparam: "../secure/server/dhparam.pem",
  },

  db: {
    uri: "mongodb://127.0.0.1:27017/chirpy",
    
    options: {
      autoReconnect: true,
      reconnectInterval: 3000,
      reconnectTries: Number.MAX_VALUE,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
  },
};
