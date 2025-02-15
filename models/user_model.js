const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userdb");

const user_schema = mongoose.Schema({
  name: String,
  email: String,
  image: String,
});

module.exports = mongoose.model("user", user_schema);
