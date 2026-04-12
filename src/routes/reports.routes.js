const router = require("express").Router();
const reportsController = require("../controllers/reports.controller");
const { requireAuth, allowRoles } = require("../middleware/auth.middleware");

router.get("/", requireAuth, reportsController.listReports);
router.post("/", requireAuth, allowRoles("admin", "analyst"), reportsController.createReport);
router.get("/:id", requireAuth, reportsController.getReportById);
router.delete("/:id", requireAuth, reportsController.deleteReportById);

module.exports = router;