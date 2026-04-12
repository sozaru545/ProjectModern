const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const authRoutes = require("./routes/auth.routes");
const playersRoutes = require("./routes/players.routes");
const teamsRoutes = require("./routes/teams.routes");
const reportsRoutes = require("./routes/reports.routes");

const sanitize = require("./middleware/sanitize.middleware");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*"
  })
);

app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(sanitize);

app.use(
  rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 200),
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "nba-stats-backend",
    phase: 2,
    authProvider: process.env.AUTH_PROVIDER || "local"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/reports", reportsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;