import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IHashProvider } from '../../../../shared/providers/IHashProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { User, UserRole } from '@prisma/client';
import { ITokenProvider } from '../../../../shared/providers/ITokenProvider';

type CreateUserRequestDTO = {
  email: string;
  username: string;
  role?: UserRole;
  password: string;
}

type Response = {
  user: User;
  token: string;
}
class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute({
    email,
    username,
    role = 'user',
    password,
  }: CreateUserRequestDTO): Promise<Response> {
    const checkEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (checkEmailAlreadyExists) {
      throw new AppError('Unable to create user', 403);
    }
    
    const checkUsernameAlreadyExists =
      await this.usersRepository.findByUsername(username, false);

    if (checkUsernameAlreadyExists) {
      throw new AppError('Username entered already exists', 403);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      username,
      role,
      password: hashedPassword,
    });
    
    const token = this.tokenProvider.generate(user);

    return {
      user,
      token
    };
  }
}

export { CreateUserUseCase };
