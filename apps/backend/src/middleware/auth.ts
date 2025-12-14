import { ClerkExpressRequireAuth, StrictAuthProp } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction, RequestHandler } from 'express';

// Extend Express Request to include Clerk auth
declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

export const requireAuth: RequestHandler = ClerkExpressRequireAuth() as unknown as RequestHandler;

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth?.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
