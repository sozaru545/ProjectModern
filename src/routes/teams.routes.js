const router = require("express").Router();
const teamsController = require("../controllers/teams.controller");

router.get("/", teamsController.listTeams);
router.get("/:teamId", teamsController.getTeamByTeamId);
router.post("/", teamsController.createTeam);

module.exports = router;