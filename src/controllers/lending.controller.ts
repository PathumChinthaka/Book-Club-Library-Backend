import { Request, Response, NextFunction } from 'express';
import { Lending } from '../models/Lending';
import { Book } from '../models/Book';
import { ThrowError } from '../util/error/error';

export const lendBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { readerId, bookId, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) throw new ThrowError('Book not found', 404);
    if (book.copiesAvailable < 1) throw new ThrowError('No available copies', 400);

    const lending = await Lending.create({ readerId, bookId, dueDate });

    book.copiesAvailable -= 1;
    await book.save();

    res.status(201).json({ message: 'Book lent successfully', lending });
  } catch (err) {
    next(err);
  }
};

export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lendingId } = req.params;

    const lending = await Lending.findById(lendingId);
    if (!lending) throw new ThrowError('Lending record not found', 404);
    if (lending.returnedDate) throw new ThrowError('Book already returned', 400);

    lending.returnedDate = new Date();
    await lending.save();

    const book = await Book.findById(lending.bookId);
    if (book) {
      book.copiesAvailable += 1;
      await book.save();
    }

    res.status(200).json({ message: 'Book returned successfully', lending });
  } catch (err) {
    next(err);
  }
};

export const getLendingList = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const lendings = await Lending.find()
      .populate('readerId', 'firstName lastName email')
      .populate('bookId', 'title isbn');

    res.json({ lendings });
  } catch (err) {
    next(err);
  }
};

export const getOverdueReaders = async (req: Request, res: Response) => {
  try {
    const now = new Date();

    const overdueLendings = await Lending.find({
      dueDate: { $lt: now },
      returnedDate: null,
    })
      .populate("readerId", "_id firstName lastName email")
      .populate("bookId", "title");

    const readerMap: Record<string, any> = {};

    overdueLendings.forEach((lending) => {
      const reader = lending.readerId as any;
      const book = lending.bookId as any;
      const readerId = reader._id.toString();

      if (!readerMap[readerId]) {
        readerMap[readerId] = {
          readerId: readerId,
          name: `${reader.firstName} ${reader.lastName}`,
          email: reader.email,
          books: [],
        };
      }

      readerMap[readerId].books.push({
        lendingId: lending._id,
        title: book.title,
        dueDate: lending.dueDate,
        reminderSent: lending.reminderSent,
      });
    });

    const readersWithOverdueBooks = Object.values(readerMap);
    res.status(200).json(readersWithOverdueBooks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching overdue readers", err });
  }
};
