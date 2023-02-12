const Record_status = require("../model/Record_staus");

const getRecord_statuses = (req, res) => {
  Record_status.find((err, record_statuses) => {
    if (err) {
      res.send(err);
    }
    res.json(record_statuses);
  });
};

const getRecord_status = (req, res) => {
  Record_status.findOne(
    { code: req.params.code },
    function (err, record_statuses) {
      if (err) {
        res.send(err);
      }
      res.json(record_statuses);
    }
  );
};

const getRecord_statusByCode = async (code) => {
  try {
    const record_status = await Record_status.findOne({ code });
    return record_status;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createRecord_status = (req, res) => {
  const record_status = new Record_status({
    code: req.body.code,
    desc: req.body.desc,
  });

  record_status.save((err, record_statuses) => {
    if (err) {
      res.send(err);
    }
    res.json(record_statuses);
  });
};

module.exports = {
  getRecord_statuses,
  getRecord_status,
  createRecord_status,
  getRecord_statusByCode,
};
