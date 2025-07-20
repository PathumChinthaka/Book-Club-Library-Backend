import { Request, Response } from "express";
import { Reader } from "../models/Reader";

export const createReader = async (req: Request, res: Response) => {
  try {
    const reader = new Reader(req.body);
    await reader.save();
    res.status(201).json({
      id: reader._id,
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
    } = req.query;

    const query: any = {};

    if (firstName) query.firstName = { $regex: firstName, $options: "i" };
    if (lastName) query.lastName = { $regex: lastName, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };

    const skip = (Number(page) - 1) * Number(pageSize);

    const [readers, total] = await Promise.all([
      Reader.find(query).skip(skip).limit(Number(pageSize)),
      Reader.countDocuments(query),
    ]);

    res.status(200).json({
      data: readers,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / Number(pageSize)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving readers", error });
  }
};

export const updateReader = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedReader = await Reader.findByIdAndUpdate(
      id,
      { ...req.body, updatedOn: new Date() },
      { new: true }
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
    const deletedReader = await Reader.findByIdAndDelete(id);
    if (!deletedReader) {
      return res.status(404).json({ message: "Reader not found" });
    }
    res.status(200).json({ message: "Reader deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting reader", error });
  }
};
