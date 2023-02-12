const router = require("express").Router();
const { getRoles, getRole, createRole } = require("./controllers/Role");
const { getTeams, getTeam, createTeam } = require("./controllers/Team");
const {
  getUser,
  getUsers,
  updateUser,
  getTeamUsers,
  createUser,
} = require("./controllers/User");
const {
  getRecord_statuses,
  getRecord_status,
  createRecord_status,
} = require("./controllers/Record_status");

const {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  getRecordsByStatus,
  getRecordsByStatusAndTeam,
  getRecordsByTeam,
} = require("./controllers/Record");

router.get("/roles", getRoles);
router.get("/roles/:code", getRole);
router.post("/roles", createRole);

router.get("/teams", getTeams);
router.get("/teams/:code", getTeam);
router.post("/teams", createTeam);

router.get("/record-status", getRecord_statuses);
router.get("/record-status/:code", getRecord_status);
router.post("/record-status", createRecord_status);

router.get("/users", getUsers);
router.get("/teams/users/:code", getTeamUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.post("/users", createUser);

router.post("/records", createRecord);
router.get("/records", getRecords);
router.get("/records/:id", getRecord);
router.put("/records/:id", updateRecord);
router.get("/records/status/:code", getRecordsByStatus);
router.get(
  "/records/status/:status_code/team/:team_code",
  getRecordsByStatusAndTeam
);
router.get("/records/team/:team_code", getRecordsByTeam);

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

module.exports = router;
