const router = require("express").Router();
const playersController = require("../controllers/players.controller");

router.get("/", playersController.listPlayers);
router.get("/:playerId", playersController.getPlayerByPlayerId);
router.post("/", playersController.createPlayer);

module.exports = router;