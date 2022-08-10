import { IUsersRepository } from '../../repositories/IUsersRepository';

import { AppError } from '../../../../shared/errors/AppError';


import { JWTokenProvider } from '../../../../shared/providers/implementations/JWTokenProvider';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { IHashProvider } from '../../../../shared/providers/IHashProvider';
import { ITokenProvider } from '../../../../shared/providers/ITokenProvider';
import { ILogsRepository } from '../../../logs/repositories/ILogsRepositories';

type SignInRequestDTO = {
  email: string;
  password: string;
}

type Response = {
  user: User;
  token: string;
}

export class SignInUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private logsRepository: ILogsRepository,
    private tokenProvider: ITokenProvider,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    password,
  }: SignInRequestDTO): Promise<Response> {
    const user = await this.usersRepository.findByEmail(
      email,
    );

    if (!user) {
      throw new AppError('User does not exist', 403);
    }

    const passwordVerified = await this.hashProvider.compareHash(password, user.password);

    if (password && password.length < 6) {
      throw new AppError('Password must be at least 6 digits', 401);
    }

    if (!passwordVerified) {
      throw new AppError('Password invalid');
    }

    const token = this.tokenProvider.generate(user);

    await this.logsRepository.create({
      content: `Logged in`,
      user_id: user.id,
    })

    return {
      user,
      token
    };
  }
}
