const express = require("express");
const router = express.Router();

const { releases } = require("../controllers/insta_release_variant");

router.get("/releases", releases);

module.exports = router;
