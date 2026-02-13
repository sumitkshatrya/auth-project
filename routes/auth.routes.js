import express from "express";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/generateOTP.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * 1️ LOGIN
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Fake validation (replace with DB)
  if (email !== "test@test.com" || password !== "123456") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const otp = generateOTP();

  req.session.user = {
    email,
    otp,
    isVerified: false,
  };

  console.log("Generated OTP:", otp);

  res.json({
    message: "OTP sent",
    sessionId: req.sessionID,
  });
});

/**
 * 2️ VERIFY OTP
 */
router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (!req.session.user) {
    return res.status(400).json({ message: "No session found" });
  }

  if (req.session.user.otp !== otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  req.session.user.isVerified = true;

  res.json({ message: "OTP verified successfully" });
});

/**
 * 3️ EXCHANGE SESSION FOR JWT
 */
router.post("/token", (req, res) => {
  if (!req.session.user || !req.session.user.isVerified) {
    return res.status(403).json({ message: "Session not verified" });
  }

  const token = jwt.sign(
    { email: req.session.user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ accessToken: token });
});

// Protected 

router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

export default router;
