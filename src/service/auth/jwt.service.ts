import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
