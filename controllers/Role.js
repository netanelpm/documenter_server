const Role = require("../model/Role");

const getRoles = (req, res) => {
  Role.find((err, todos) => {
    if (err) {
      res.send(err);
    }
    res.json(todos);
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
  createRole,
};
