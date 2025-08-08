const express = require("express");
const router = express.Router();
const clanController = require("../controllers/clanController.js");

router.get("/:clanTag", clanController.getClanInfo);

module.exports = router;
