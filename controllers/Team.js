const Team = require("../model/Team");

const getTeams = (req, res) => {
  Team.find((err, teams) => {
    if (err) {
      res.send(err);
    }
    res.json(teams);
  });
};

const getTeam = (req, res) => {
  Team.findOne({ code: req.params.code }, function (err, teams) {
    if (err) {
      res.send(err);
    }
    res.json(teams);
  });
};

const createTeam = (req, res) => {
  console.log(req.body);
  const team = new Team({
    code: req.body.code,
    desc: req.body.desc,
  });

  team.save((err, team) => {
    console.log("err", err);
    console.log("Team", team);
    if (err) {
      res.send(err);
    }
    res.json(team);
  });
};

const getTeamByCode = async (code) => {
  try {
    const team = await Team.findOne({ code });
    return team;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getTeams,
  getTeam,
  createTeam,
  getTeamByCode,
};
