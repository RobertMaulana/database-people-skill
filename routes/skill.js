const express = require('express');
const router = express.Router();
const skillController = require("../controllers/skill_controller");

router.get("/", skillController.dataSkill)
router.post("/", skillController.createSkill)
router.put("/:id", skillController.updateSkill)
router.delete("/:id", skillController.removeSkill)

module.exports = router
