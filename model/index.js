const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.todo = require("./todo");
db.user = require("./user");

module.exports = db;

