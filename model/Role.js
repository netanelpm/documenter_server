const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Role", RoleSchema);
