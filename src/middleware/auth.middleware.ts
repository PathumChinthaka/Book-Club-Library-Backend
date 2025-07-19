import dotenv from 'dotenv' 
dotenv.config()
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ThrowError } from "../util/error/error";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(
      new ThrowError(
        "Access Denied! Authentication token is missing from the request headers.",
        401
      )
    );
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) {
        return next(
          new ThrowError(
            "Invalid Token! Your session has expired or the token is invalid. Please log in again.",
            403
          )
        );
      }

      req.user = decoded;
      next();
    }
  );
};
