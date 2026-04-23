const router = require("express").Router();
const controller = require("../controllers/favorites.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.get("/", requireAuth, controller.listFavorites);
router.post("/", requireAuth, controller.createFavorite);
router.delete("/:playerId", requireAuth, controller.deleteFavorite);

module.exports = router;