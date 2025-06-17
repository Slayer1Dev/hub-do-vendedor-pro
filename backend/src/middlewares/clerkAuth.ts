import { Clerk } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("CRITICAL: CLERK_SECRET_KEY não está definida nas variáveis de ambiente.");
}

export const clerk = Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
  jwtKey: process.env.CLERK_JWT_KEY,
});

export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
  };
}

export const clerkAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = req.headers.authorization?.split(' ')[1];

  if (!sessionToken) {
    return res.status(401).json({ error: 'Unauthorized. No session token provided.' });
  }

  try {
    const claims = await clerk.verifyToken(sessionToken);
    
    if (!claims || !claims.sub) {
      return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }

    req.auth = { userId: claims.sub };
    next();
  } catch (error) {
    console.error('Clerk token verification failed:', error);
    return res.status(401).json({ error: 'Unauthorized. Token verification failed.' });
  }
};