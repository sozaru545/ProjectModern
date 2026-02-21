const router = require("express").Router();
const reportsController = require("../controllers/reports.controller");
const optionalAuth = require("../middleware/optionalAuth.middleware");

// Phase 1: optional auth only (no enforcement yet)
router.use(optionalAuth);

router.get("/", reportsController.listReports);
router.post("/", reportsController.createReport);
router.get("/:id", reportsController.getReportById);
router.delete("/:id", reportsController.deleteReportById);

module.exports = router;