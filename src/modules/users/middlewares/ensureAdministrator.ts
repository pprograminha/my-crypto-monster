import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import { prisma } from '../../../shared/prisma/client';

export default async function ensureAdministrator(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const user_id = request.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!user) throw new AppError('User does not exist', 401);

  if (user.role !== 'admin') throw new AppError('Only administrator can access here', 401);

  return next();
}
