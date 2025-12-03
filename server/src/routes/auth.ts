import { Router } from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { User } from "../models/User";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";

const router = Router();

// Helper: set cookie
function setAccessCookie(res: any, token: string) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const, // helps with CSRF (strict may break some flows)
    maxAge: 15 * 60 * 1000, // 15 minutes
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: "/",
  };
  res.cookie("accessToken", token, cookieOptions);
}

function setRefreshCookie(res: any, token: string) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    domain: process.env.COOKIE_DOMAIN || undefined,
    path: "/api/auth/refresh", // restrict path optionally
  };
  res.cookie("refreshToken", token, cookieOptions);
}

// REGISTER
router.post("/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, name } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already used" });

    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = new User({ email, password: hashed, name });
    await user.save();

    // create tokens
    const accessToken = signAccessToken({ userId: user._id });
    const refreshToken = signRefreshToken({ userId: user._id });

    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    return res.status(201).json({ user: { id: user._id, email: user.email, name: user.name } });
  }
);

// LOGIN
router.post("/login",
  body("email").isEmail(),
  body("password").exists(),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken({ userId: user._id });
    const refreshToken = signRefreshToken({ userId: user._id });

    setAccessCookie(res, accessToken);
    setRefreshCookie(res, refreshToken);

    return res.json({ user: { id: user._id, email: user.email, name: user.name } });
  }
);

// LOGOUT
router.post("/logout", (req, res) => {
  // clear cookies
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
  return res.json({ ok: true });
});

// REFRESH
router.post("/refresh", async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const payload: any = verifyRefreshToken(token) as any;
    const accessToken = signAccessToken({ userId: payload.userId });
    setAccessCookie(res, accessToken);
    return res.json({ ok: true });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

export default router;
