const router = require("express").Router();
const { requireAuth, allowRoles } = require("../middleware/auth.middleware");

router.get("/", (req, res) => {
  res.json({ message: "All players" });
});

router.post("/", requireAuth, allowRoles("admin"), (req, res) => {
  res.json({ message: "Player created" });
});

module.exports = router;