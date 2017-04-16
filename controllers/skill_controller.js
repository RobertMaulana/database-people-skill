const db = require('../models/skill_model');

let dataSkill = (req, res) => {
  db.find({})
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}
let createSkill = (req, res) => {
  db.create({
    nama_skill: req.body.nama_skill,
    score: "",
    user: []
  }).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.send(err.message)
  })
}

let updateSkill = (req, res) => {
  db.findByIdAndUpdate(req.params.id,{
    nama_skill: req.body.nama_skill,
  }).then((result) => {
    res.send(`Data skill with id ${req.params.id} has been updated!`)
  }).catch((err) => {
    res.send(err.message)
  })
}

let removeSkill = (req, res) => {
  db.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.send(`Data skill with id ${req.params.id} has been removed!`)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

module.exports = {
  dataSkill, createSkill, updateSkill, removeSkill
}
