const router = require("express").Router();
const { requireAuth, allowRoles } = require("../middleware/auth.middleware");

router.get("/", requireAuth, (req, res) => {
  res.json({ message: "Reports list" });
});

router.post("/", requireAuth, allowRoles("admin", "analyst"), (req, res) => {
  res.json({ message: "Report created" });
});

module.exports = router;