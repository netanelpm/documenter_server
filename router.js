const router = require("express").Router();
const { getRoles, createRole } = require("./controllers/Role");

router.get("/roles", getRoles);
router.post("/roles", createRole);
router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

module.exports = router;
