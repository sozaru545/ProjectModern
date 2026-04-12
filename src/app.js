const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const sanitize = require("./middleware/sanitize.middleware");

const authRoutes = require("./routes/auth.routes");
const playerRoutes = require("./routes/players.routes");
const teamRoutes = require("./routes/teams.routes");
const reportRoutes = require("./routes/reports.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(sanitize);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
  })
);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/reports", reportRoutes);

module.exports = app;