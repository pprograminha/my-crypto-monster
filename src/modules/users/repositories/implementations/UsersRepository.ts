import { v4 as uuid } from 'uuid';
import { IUsersRepository, CreateUserDTO } from '../IUsersRepository';
import { prisma } from '../../../../shared/prisma/client';
import { PremiumPass, User } from '@prisma/client';

class UsersRepository implements IUsersRepository {
  async findByUsername(
    username: string,
    enabled: boolean = true,
  ): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        username,
        ...(enabled ? { enabled } : {}),
      },
    });
    return user
  }

  async findByEmail(
    email: string,
  ): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user
  }

  async findById(
    user_id: string,
  ): Promise<(User & {
    premium_pass: PremiumPass | null;
}) | null | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
        enabled: true,
      },
      include: {
        premium_pass: true,
      }
    });
    return user
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        id: uuid(),
        ...data
      },
    });

    return user 
  }

  async save({
    id: user_id,
    ...data
  }: User): Promise<User> {
    const userUpdated = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
    return userUpdated 
  }

  async findAllUsers(enabled: boolean = true): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        ...(enabled ? { enabled } : {}),
      }
    });

    return users 
  }
}

export { UsersRepository };
