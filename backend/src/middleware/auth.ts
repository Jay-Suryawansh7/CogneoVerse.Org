import { Request, Response, NextFunction, RequestHandler } from 'express';

// Auth disabled for now - allow all requests
export const requireAuth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export const requireAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  next();
};

