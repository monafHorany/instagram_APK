const asyncHandler = require("express-async-handler");
const release = require("../models/release");
const variant = require("../models/variants");

const getAllReleases = asyncHandler(async (req, res, next) => {
  let releases;
  try {
    releases = await release.find();
    return res.status(200).json(releases);
  } catch (error) {
    return res.status(500).send(error);
  }
});
const getReleaseVariant = asyncHandler(async (req, res, next) => {
  let variants;
  try {
    variants = await variant.find({ variant_name: req.params.id });
    return res.status(200).json(variants);
  } catch (error) {
    return res.status(500).send(error);
  }
});

const updateRelease = asyncHandler(async (req, res, next) => {
  const { releaseData } = req.body;
  const update = {
    release_name: releaseData.release_name,
    release_id: releaseData.release_id,
    release_date: releaseData.release_date,
    variant_available: releaseData.variant_available,
  };
  // return;
  try {
    await release.findOneAndUpdate({ release_id: req.params.id }, update, {
      new: true,
    });
    return res.status(201).send("updated");
  } catch (error) {
    return res.status(500).send(error);
  }
});
const deleteRelease = asyncHandler(async (req, res, next) => {
  try {
    await release.deleteOne({ release_id: req.params.id });
    return res.status(201).send("deleted");
  } catch (error) {
    return res.status(500).send(error);
  }
});

exports.getAllReleases = getAllReleases;
exports.getReleaseVariant = getReleaseVariant;
exports.updateRelease = updateRelease;
exports.deleteRelease = deleteRelease;
