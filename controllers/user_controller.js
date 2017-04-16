const dbUser = require('../models/user_model');
const dbSkill = require('../models/skill_model');
const dbScore = require('../models/score_model');

let dataUser = (req, res) => {
  dbScore.find({}).populate("user").populate("skill").exec((err, result) => {
    if (!err) {
      res.send(result)
    }else {
      res.send(err.message)
    }
  })
}
let createUser = (req, res) => {
  let skill;
  if (/[,]/g.test(req.body.skill)) {
    skill = req.body.skill.split(",")
  }else {
    skill = req.body.skill;
  }
  let score;
  if (/[,]/g.test(req.body.score)) {
    score = req.body.score.split(",")
  }else {
    score = req.body.score;
  }
  dbUser.findOne({nama: req.body.nama}, (err, userExist) => {
    if (userExist != null) {
      res.send("User already exist!")
    }else {
      dbUser.create({
        nama: req.body.nama,
        skill: skill
      }, (err, result) => {
        if (!err) {
          if (skill.length > 1) {
            for (var i = 0; i < skill.length; i++) {
              dbScore.create({
                score: score[i],
                skill: skill[i],
                user: result._id
              })
            }
            res.send(`Success!`)
          }else {
            dbScore.create({
              score: score,
              skill: skill,
              user: result._id
            }, (err, success) => {
              if (!err) {
                res.send(`Success!`)
              }else{
                res.send(err.message)
              }
            })
          }
        }else {
          res.send(err.message)
        }
      })
    }
  })

}

let updateUser = (req, res) => {
  let skill;
  if (/[,]/g.test(req.body.skill)) {
    skill = req.body.skill.split(",")
  }else {
    skill = req.body.skill;
  }
  let score;
  if (/[,]/g.test(req.body.score)) {
    score = req.body.score.split(",")
  }else {
    score = req.body.score;
  }
  dbUser.update(
    { _id: req.params.id},
    { $set: { nama: req.body.nama, skill: skill }}, (err, success) => {
  })

    dbUser.findOne({_id: req.params.id}, (err, result) => {
      if (skill.length > 1) {
        dbScore.find({}, (err, res) => {
          res.forEach((dataScore, index) => {
            // belum selesai
            dbScore.update(
              { user: req.params.id},
              { score: score[index]},{multi: true}
            )
          })
          res.send("success")
        })
      }else {
        dbScore.update(
          { skill: skill, user: req.params.id },
          { $set: { score: score}}, (err, success) => {
            if (!err) {
              console.log("success");
            }else {
              console.log("failed");
            }
          }
        )

      }
    })
}

let removeUser = (req, res) => {
  dbUser.findByIdAndRemove(req.params.id)
    .then((result) => {
      dbScore.find({user: req.params.id}, (err, result) => {
        result.forEach((dataScroe) => {
          dbScore.remove({_id: dataScroe._id}, (err, res) => {
            console.log("sukses");
          })
        })
      })
      res.send(`Data skill with id ${req.params.id} has been removed!`)
    })
    .catch((err) => {
      res.send(err.message)
    })

}

module.exports = {
  dataUser, createUser, updateUser, removeUser
}
