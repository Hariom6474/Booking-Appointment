const express = require("express");

const mainController = require("../controller/main");

const router = express.Router();

router.post("/add-user", mainController.postAddIndex);
router.get("/get-user", mainController.getIndex);
router.delete("/delete-user/:id", mainController.postDeleteIndex);

module.exports = router;
