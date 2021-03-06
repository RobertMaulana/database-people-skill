const express = require('express');
const router = express.Router();
const userController = require("../controllers/user_controller");

router.post("/", userController.createUser)
router.get("/", userController.dataUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.removeUser)

module.exports = router
