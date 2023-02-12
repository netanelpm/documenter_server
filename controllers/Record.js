const { Note, NoteSchema } = require("../model/Note");
const Record = require("../model/Record");
const Record_staus = require("../model/Record_staus");
const { getRecord_statusByCode } = require("./Record_status");
const { getTeamByCode } = require("./Team");
const mongoose = require("mongoose");

const getRecord = (req, res) => {
  Record.findById(req.params.id)
    .populate({
      path: "notes.creator_objectId",
      model: "User",
      select: "id name -_id",
    })
    .populate({
      path: "creator",
      populate: {
        path: "role_code",
        select: "desc -_id",
      },
      select: "id name -_id",
    })
    .populate({
      path: "assignee",
      populate: {
        path: "role_code",
        select: "desc -_id",
      },
      select: "id name -_id",
    })
    .populate("status", "code desc -_id")
    .exec(function (err, record) {
      if (err) {
        res.send(err);
      }
      res.json(record);
    });
};

const getRecords = (req, res) => {
  Record.find()
    .populate({
      path: "notes.creator_objectId",
      model: "User",
      select: "id name -_id",
    })
    .populate({
      path: "creator",
      populate: {
        path: "role_code",
        select: "desc -_id",
      },
      select: "id name -_id",
    })
    .populate({
      path: "assignee",
      populate: {
        path: "role_code",
        select: "desc -_id",
      },
      select: "id name -_id",
    })
    .populate("status", "code desc -_id")
    .exec(function (err, records) {
      if (err) {
        res.send(err);
      }
      res.json(records);
    });
};

const getRecordsByStatus = async (req, res) => {
  const record_status = await getRecord_statusByCode(req.params.code);
  console.log("record_status", record_status);
  if (!record_status) {
    res.status(404).send({ error: `status code ${req.params.code} not found` });
    return;
  }
  Record.find({ status: record_status._id })
    .populate({
      path: "notes.creator_objectId",
      model: "User",
      select: "id name -_id",
    })
    .populate({
      path: "creator",
      populate: {
        path: "role_code",
        select: "desc -_id",
      },
      select: "id name -_id",
    })
    .populate({
      path: "assignee",
      populate: {
        path: "role_code",
        select: "desc -_id",
      },
      select: "id name -_id",
    })
    .populate("status", "code desc -_id")
    .exec(function (err, records) {
      if (err) {
        res.send(err);
      }
      res.json(records);
    });
};

const getRecordsByStatusAndTeam = async (req, res) => {
  const record_status = await getRecord_statusByCode(req.params.status_code);

  if (!record_status) {
    res
      .status(404)
      .send({ error: `status code ${req.params.status_code} not found` });
    return;
  }

  Record.find({
    status: record_status._id,
  })
    .populate({
      path: "notes.creator_objectId",
      model: "User",
      select: "id name -_id",
    })
    .populate({
      path: "creator",
      populate: {
        path: "role_code",
        select: "desc -_id",
      },
      select: "id name -_id",
    })
    .populate({
      path: "assignee",
      populate: {
        path: "role_code",
        select: "desc -_id",
      },
      select: "id name team_code -_id",
    })
    .populate("status", "code desc -_id")
    .exec(function (err, records) {
      if (err) {
        res.send(err);
        return;
      }
      records = records.filter(function (record) {
        return record.assignee.team_code == req.params.team_code;
      });
      res.status(200).json(records);
    });
};

const getRecordsByTeam = async (req, res) => {
  console.log("req.params.team_code", req.params.team_code);
  // Record.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "assignee",
  //       foreignField: "_id",
  //       as: "newassignee",
  //     },
  //   },
  //   {
  //     $match: {
  //       "newassignee.team_code": mongoose.Types.ObjectId(req.params.team_code),
  //     },
  //   },
  // ])
  //   .exec()
  //   .then(function (error, records) {
  //     if (error) {
  //       console.log("error", error);
  //       res.status(400).json(error);
  //       return;
  //     }
  //     res.status(200).json(records);
  //   });

  Record.aggregate(
    [
      {
        $lookup: {
          from: "users",
          localField: "assignee",
          foreignField: "_id",
          as: "newassignee",
        },
      },
      {
        $match: {
          "newassignee.team_code": mongoose.Types.ObjectId(
            req.params.team_code
          ),
        },
      },
    ],
    (error, records) => {
      if (error) {
        console.log("error", error);
        res.status(400).json(error);
        return;
      }
      res.json(records);
    }
  );
};

const createRecord = async (req, res) => {
  try {
    console.log(req.body);
    const record = new Record({
      title: req.body.title,
      notes: [
        new Note({
          createdAt: req.body.createdAt,
          content: req.body.note,
          creator_objectId: req.body.creatorId,
        }),
      ],
      createdAt: req.body.createdAt,
      creator: req.body.creatorId,
      assignee: req.body.assigneeId,
      status: req.body.statusId,
    });

    await record.save();
    res.json(record);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    record.title = req.body.title;
    record.assignee = req.body.assigneeId;
    record.status = req.body.statusId;
    if (req.body.note && req.body.note != "")
      record.notes.push(
        new Note({
          createdAt: Date.now(),
          content: req.body.note,
          creator_objectId: req.body.creatorId,
        })
      );
    await record.save();
    res.send(record);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  getRecordsByStatus,
  getRecordsByStatusAndTeam,
  getRecordsByTeam,
};
