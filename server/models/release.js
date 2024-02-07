let mongoose = require("mongoose");
const variantSchema = require("./variants");

let releaseSchema = new mongoose.Schema({
  release_name: { type: String, required: true, unique: true },
  release_id: { type: String, required: true, unique: true },
  release_date: { type: String, required: true },
  release_link: {
    type: String,
    required: true,
    unique: true,
  },
  variant_available: {
    type: String,
  },
});

module.exports = mongoose.model("Release", releaseSchema);
