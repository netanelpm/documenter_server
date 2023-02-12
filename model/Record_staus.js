const mongoose = require("mongoose");

const Record_statusSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Record_status", Record_statusSchema);
