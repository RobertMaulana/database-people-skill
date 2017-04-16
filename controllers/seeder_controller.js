const db = require('../models/skill_model');
const fs = require('fs');

let seedSkill = (req, res) => {
  let readSkill = fs.readFileSync("./seeders/skill.json", "utf8");
  let dataSkill = JSON.parse(readSkill);
  dataSkill.forEach((skills) => {
    db.create({
      nama_skill: skills.nama_skill,
      score: skills.score
    })
  })
  res.send(`Data saved!`);
}

module.exports = {
  seedSkill
}
