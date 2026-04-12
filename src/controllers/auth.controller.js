const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

exports.register = async (req, res, next) => {
  try {
    if (process.env.AUTH_PROVIDER === "keycloak") {
      return res.status(403).json({
        message: "Local registration is disabled when Keycloak auth is delegated"
      });
    }

    const { email, password, role } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("email and password are required");
    }

    if (password.length < 8) {
      res.status(400);
      throw new Error("password must be at least 8 characters");
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409);
      throw new Error("email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      role: role && ["fan", "analyst", "admin"].includes(role) ? role : "fan"
    });

    const token = signToken(user);

    res.status(201).json({
      message: "registered",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (process.env.AUTH_PROVIDER === "keycloak") {
      return res.status(403).json({
        message: "Local login is disabled when Keycloak auth is delegated"
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("email and password are required");
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401);
      throw new Error("invalid credentials");
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      res.status(401);
      throw new Error("invalid credentials");
    }

    const token = signToken(user);

    res.json({
      message: "logged_in",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    if (process.env.AUTH_PROVIDER === "keycloak") {
      return res.json({ user: req.user });
    }

    const user = await User.findById(req.user.id).select("_id email role createdAt updatedAt");

    if (!user) {
      res.status(404);
      throw new Error("user not found");
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
};