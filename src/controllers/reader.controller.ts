import { Request, Response } from "express";
import { Reader } from "../models/Reader";
import { User } from "../models/User";
import { UserRole } from "../types/enum/userRole.enum";
import { ActiveStatus } from "../types/enum/activeStatusEnum";

export const createReader = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, address } = req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      address,
    });

    await user.save();

    res.status(201).json({
      id: user._id,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating reader", error });
  }
};

export const getAllReaders = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      firstName,
      lastName,
      email,
      search,
    } = req.query;

    const query: any = {
      role: UserRole.Reader,
      activeStatus: ActiveStatus.Active,
    };

    if (firstName) query.firstName = { $regex: firstName, $options: "i" };
    if (lastName) query.lastName = { $regex: lastName, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };

    if (search) {
      const regex = new RegExp(search as string, "i");
      query.$or = [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { phone: regex },
      ].filter(Boolean);
    }

    const skip = (Number(page) - 1) * Number(pageSize);

    const [readers, total] = await Promise.all([
      User.find(query)
        .skip(skip)
        .limit(Number(pageSize))
        .sort({ createdOn: -1 })
        .select("-password"),
      User.countDocuments(query),
    ]);

    res.status(200).json({
      page: Number(page),
      pageSize: Number(pageSize),
      data: readers,
      total,
      totalPages: Math.ceil(total / Number(pageSize)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving readers", error });
  }
};

export const updateReader = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };
    delete updateData.password;
    updateData.updatedOn = new Date();

    const updatedReader = await User.findOneAndUpdate(
      { _id: id, role: UserRole.Reader },
      updateData,
      {
        new: true,
        select: "-password -role -activeStatus",
      }
    );

    if (!updatedReader) {
      return res.status(404).json({ message: "Reader not found" });
    }

    res.status(200).json(updatedReader);
  } catch (error) {
    res.status(400).json({ message: "Error updating reader", error });
  }
};

export const deleteReader = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedReader = await User.findOneAndUpdate(
      { _id: id, role: UserRole.Reader },
      {
        activeStatus: ActiveStatus.Deleted,
        updatedOn: new Date(),
      },
      { new: true }
    );

    if (!deletedReader) {
      return res.status(404).json({ message: "Reader not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: "Error deleting reader", error });
  }
};
