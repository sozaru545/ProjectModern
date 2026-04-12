const jwt = require("jsonwebtoken");

function extractBearerToken(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return null;
  return header.split(" ")[1];
}

function getKeycloakPublicKey() {
  const raw = process.env.KEYCLOAK_REALM_PUBLIC_KEY;
  if (!raw) return null;

  if (raw.includes("BEGIN PUBLIC KEY")) {
    return raw;
  }

  return `-----BEGIN PUBLIC KEY-----\n${raw}\n-----END PUBLIC KEY-----`;
}

exports.requireAuth = (req, res, next) => {
  try {
    const token = extractBearerToken(req);

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (process.env.AUTH_PROVIDER === "keycloak") {
      const publicKey = getKeycloakPublicKey();

      if (!publicKey) {
        return res.status(500).json({
          message: "Keycloak auth is enabled but KEYCLOAK_REALM_PUBLIC_KEY is missing"
        });
      }

      const decoded = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
        issuer: process.env.KEYCLOAK_ISSUER,
        audience: process.env.KEYCLOAK_AUDIENCE
      });

      req.user = {
        id: decoded.sub,
        email: decoded.email,
        role:
          decoded.realm_access?.roles?.includes("admin")
            ? "admin"
            : decoded.realm_access?.roles?.includes("analyst")
              ? "analyst"
              : "fan"
      };

      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.optionalAuth = (req, res, next) => {
  try {
    const token = extractBearerToken(req);
    if (!token) return next();

    if (process.env.AUTH_PROVIDER === "keycloak") {
      const publicKey = getKeycloakPublicKey();
      if (!publicKey) return next();

      const decoded = jwt.verify(token, publicKey, {
        algorithms: ["RS256"],
        issuer: process.env.KEYCLOAK_ISSUER,
        audience: process.env.KEYCLOAK_AUDIENCE
      });

      req.user = {
        id: decoded.sub,
        email: decoded.email,
        role:
          decoded.realm_access?.roles?.includes("admin")
            ? "admin"
            : decoded.realm_access?.roles?.includes("analyst")
              ? "analyst"
              : "fan"
      };

      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next();
  }
};

exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
};