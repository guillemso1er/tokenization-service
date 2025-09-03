import { Request, Response, NextFunction } from 'express';

export const validateTokenizeRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data } = req.body;
  if (!data || typeof data !== 'string') {
    return res.status(400).json({ message: 'Invalid data format' });
  }
  next();
};