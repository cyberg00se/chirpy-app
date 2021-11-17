const mongoose = require("mongoose");
const autoPopulatePlugin = require("mongoose-autopopulate");
const {db} = require("../config/default");

mongoose.plugin(autoPopulatePlugin);

mongoose.connect(db.uri, {
  ...db.options
});
const connection = mongoose.connection;
module.exports.connection = connection;

connection.on("connected", () => {
  console.info("[DATABASE] main[mongo] connection has been established successfully.");
});
connection.on("error", err => console.error(err));
connection.on("disconnected", () => {
  console.info("[DATABASE] main[mongo] disconnected from the database");
});
