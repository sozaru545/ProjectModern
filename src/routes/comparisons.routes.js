const router = require("express").Router();
const controller = require("../controllers/comparisons.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.get("/", requireAuth, controller.listComparisons);
router.post("/", requireAuth, controller.createComparison);
router.delete("/:id", requireAuth, controller.deleteComparison);

module.exports = router;