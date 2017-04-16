const mongoose = require('mongoose');
const db = require("./db");

let userSchema = new mongoose.Schema({
  nama: String,
  skill: [{
    type: mongoose.Schema.ObjectId,
    ref: "Skill"
  }],
});

let User = db.model("User", userSchema);

module.exports = User
