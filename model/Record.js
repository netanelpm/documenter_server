const mongoose = require("mongoose");
const { Note, NoteSchema } = require("./Note");

const RecordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notes: [NoteSchema],
  createdAt: {
    type: Date,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Record_status",
  },
});

module.exports = mongoose.model("Record", RecordSchema);
