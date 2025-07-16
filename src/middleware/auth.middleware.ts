import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'No token provided' });

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
