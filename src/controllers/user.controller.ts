import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { ActiveStatus } from "../types/enum/activeStatusEnum";

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      _id: id,
      activeStatus: ActiveStatus.Active, 
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const allowedUpdates = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "role",
      "address",
      "profilePictureUrl",
    ];
    const updates: Partial<typeof req.body> = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined || null) {
        updates[key] = req.body[key];
      }
    }

    updates.updatedOn = new Date();

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      context: "query",
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};
