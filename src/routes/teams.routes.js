const router = require("express").Router();
const teamsController = require("../controllers/teams.controller");
const { requireAuth, allowRoles } = require("../middleware/auth.middleware");

router.get("/", teamsController.listTeams);
router.get("/:teamId", teamsController.getTeamByTeamId);
router.post("/", requireAuth, allowRoles("admin"), teamsController.createTeam);
router.put("/:teamId", requireAuth, allowRoles("admin"), teamsController.updateTeamByTeamId);
router.delete("/:teamId", requireAuth, allowRoles("admin"), teamsController.deleteTeamByTeamId);

module.exports = router;