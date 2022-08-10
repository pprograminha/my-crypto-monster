import { PremiumPass, User, UserRole } from '@prisma/client';

type CreateUserDTO = {
  username: string;
  email: string;
  role: UserRole;
  password: string;
}

interface IUsersRepository {
  findByEmail(
    email: string,
  ): Promise<User | null>;
  findById(
    id: string,
  ): Promise<(User & {
    premium_pass: PremiumPass | null;
}) | null | null>;
  findByUsername(
    username: string,
    enabled?: boolean,
  ): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findAllUsers(enabled?: boolean): Promise<User[]>;
}
export { IUsersRepository, CreateUserDTO };
