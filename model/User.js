const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
  },
  role_code: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Role",
  },
  team_code: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Team",
  },
});

module.exports = mongoose.model("User", UserSchema);
