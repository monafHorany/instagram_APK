const express = require("express");
const router = express.Router();

const {
  getAllReleases,
  getReleaseVariant,
  deleteRelease,
  updateRelease,
} = require("../controllers/crud");

router.get("/getreleasevariants/:id", getReleaseVariant);
router.get("/getallreleases", getAllReleases);
router.put("/updaterelease/:id", updateRelease);
router.delete("/deleterelease/:id", deleteRelease);

module.exports = router;
