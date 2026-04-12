const router = require("express").Router();
const playersController = require("../controllers/players.controller");
const { requireAuth, allowRoles } = require("../middleware/auth.middleware");

router.get("/", playersController.listPlayers);
router.get("/:playerId", playersController.getPlayerByPlayerId);
router.post("/", requireAuth, allowRoles("admin"), playersController.createPlayer);
router.put("/:playerId", requireAuth, allowRoles("admin"), playersController.updatePlayerByPlayerId);
router.delete("/:playerId", requireAuth, allowRoles("admin"), playersController.deletePlayerByPlayerId);

module.exports = router;