import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { AuthenticationError } from '../models/custom-error.model';

const authorizeSecret = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const hasToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer');
    if (!hasToken) {
      throw new AuthenticationError('Not authorized, no token');
    }
    
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      next();
    } catch (error) {
      throw new AuthenticationError('Not authorized');
    } 
  }
);

export { authorizeSecret };
