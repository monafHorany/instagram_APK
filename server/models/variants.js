let mongoose = require("mongoose");

let variantSchema = new mongoose.Schema({
  variant_id: { type: String, required: true, unique: true },
  variant_name: { type: String, required: true },
  variant_date: { type: String, required: true },
  download_link: { type: String, required: true },
  architecture: { type: String, required: true },
  minimum_version: { type: String, required: true },
  screen_dPI: { type: String, required: true },
  releaseId: { type: mongoose.Types.ObjectId, ref: "Release", required: true },
});

module.exports = mongoose.model("Variant", variantSchema);
