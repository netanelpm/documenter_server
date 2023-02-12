const Role = require("../model/Role");

const getRoles = (req, res) => {
  Role.find((err, roles) => {
    if (err) {
      res.send(err);
    }
    res.json(roles);
  });
};

const getRole = (req, res) => {
  Role.findOne({ code: req.params.code }, function (err, roles) {
    if (err) {
      res.send(err);
    }
    res.json(roles);
  });
};

const createRole = (req, res) => {
  const role = new Role({
    code: req.body.code,
    desc: req.body.desc,
  });

  role.save((err, role) => {
    if (err) {
      res.send(err);
    }
    res.json(role);
  });
};

module.exports = {
  getRoles,
  getRole,
  createRole,
};
