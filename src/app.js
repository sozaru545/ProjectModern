const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const playersRoutes = require("./routes/players.routes");
const teamsRoutes = require("./routes/teams.routes");
const reportsRoutes = require("./routes/reports.routes");

const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "nba-stats-backend", phase: 1 });
});

app.use("/api/auth", authRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/reports", reportsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;