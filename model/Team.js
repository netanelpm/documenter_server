const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Team", TeamSchema);
