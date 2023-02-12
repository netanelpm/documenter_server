const User = require("../model/User");

const getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};

const getUser = (req, res) => {
  User.findOne({ id: req.params.id })
    .populate("role_code", "code desc -_id")
    .populate("team_code", "code desc -_id")
    .exec(function (err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          id: req.body.id,
          name: req.body.name,
          mail: req.body.mail,
          role_code: req.body.role_code,
          team_code: req.body.team_code,
        },
      },
      {
        new: true,
      }
    );
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

const getTeamUsers = (req, res) => {
  console.log("req.params.code" + req.params.code);
  User.find({ team_code: req.params.code })
    .populate("role_code", "desc -_id")
    .select("id name mail")
    .exec(function (err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
};

const createUser = (req, res) => {
  const user = new User({
    id: req.body.id,
    name: req.body.name,
    mail: req.body.mail,
    role_code: req.body.role_code,
    team_code: req.body.team_code,
  });

  user.save((err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  getTeamUsers,
  updateUser,
};
