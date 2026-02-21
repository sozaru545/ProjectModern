const jwt = require("jsonwebtoken");

/**
 * Phase 1 middleware:
 * - If a Bearer token exists, decode it and attach user to req.user
 * - If no token exists, continue without error
 * - No authorization enforcement yet (Phase 2)
 */
module.exports = function optionalAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next();
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    // Ignore invalid tokens in Phase 1
  }

  next();
};