const mongoose = require('mongoose');
const db = require("./db");

let scoreSchema = new mongoose.Schema({
  score: Number,
  skill: [{
    type: mongoose.Schema.ObjectId,
    ref: "Skill"
  }],
  user: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
});

let Score = db.model("Score", scoreSchema);

module.exports = Score
