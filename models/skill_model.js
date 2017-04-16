const mongoose = require('mongoose');
const db = require("./db");

let skillSchema = new mongoose.Schema({
  nama_skill: {
    type: String,
    unique: true
  },
});

let Skill = db.model("Skill", skillSchema);

module.exports = Skill
