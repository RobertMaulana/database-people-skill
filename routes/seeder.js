const express = require('express');
const router = express.Router();
const seederController = require("../controllers/seeder_controller");

router.get("/", seederController.seedSkill)

module.exports = router
