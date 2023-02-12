const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creator_objectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = { Note, NoteSchema };
