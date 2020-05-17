const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  slug: {
    type: String,
    required: true,
  },
  tags: [String],
});

module.exports = mongoose.model("SongWithTags", songSchema);
