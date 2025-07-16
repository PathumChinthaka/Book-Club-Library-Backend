import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User";
import { RefreshToken } from "../models/auth/RefreshToken";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  res.status(201).json({ message: "User created", userId: user._id });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  res.json({ accessToken: token });
};
