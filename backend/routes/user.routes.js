const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.get("/", UserController.read);
router.get("/:id", UserController.readById);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
