const router = require("express").Router();
const { requireAuth, allowRoles } = require("../middleware/auth.middleware");

router.get("/", (req, res) => {
  res.json({ message: "All teams" });
});

router.post("/", requireAuth, allowRoles("admin"), (req, res) => {
  res.json({ message: "Team created" });
});

module.exports = router;