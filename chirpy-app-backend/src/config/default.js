module.exports = {
  app: {
    jwtSecret: "",
    domain: "http://localhost",

    port: 3000,
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
