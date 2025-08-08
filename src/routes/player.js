const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController.js");

router.get("/:playerTag/battlelog", playerController.getBattlelog);
router.get("/:playerTag/stats", playerController.getStats);

module.exports = router;
