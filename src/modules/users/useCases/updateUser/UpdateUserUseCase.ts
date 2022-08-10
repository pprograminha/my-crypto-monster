import { IHashProvider } from '../../../../shared/providers/IHashProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { User, UserRole } from '@prisma/client';
import { IUsersRepository } from '../../repositories/IUsersRepository';

type UpdateUserRequestDTO = {
  user_id: string;
  username: string;
  role?: UserRole;

  old_password?: string;
  new_password?: string;
  new_password_confirmation?: string;
}

type Response = {
  user: User;
}

class UpdateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    username,
    new_password,
    new_password_confirmation,
    old_password,
    role
  }: UpdateUserRequestDTO): Promise<Response> {
    const user_logged = await this.usersRepository.findById(user_id);

    if (!user_logged) {
      throw new AppError('Username does not exists', 403);
    }

    if(username !== user_logged.username) {
      const found_username_different = await this.usersRepository.findByUsername(username);

      if(found_username_different) {
        throw new AppError('Username exists another account', 403);
      }

      user_logged.username = username;
    }

    // TODO - Verify if string exist "admin || default"

    if(role) {
      user_logged.role = role;
    }

    if(old_password) {
      if(!new_password_confirmation || !new_password) {
        throw new AppError('New password and confirmation is required', 403);
      }

      if(new_password !== new_password_confirmation) {
        throw new AppError('New password and confirmation not matched', 403);
      }

      const oldPasswordMatched = this.hashProvider.compareHashSync(old_password, user_logged.password);

      if(!oldPasswordMatched) {
        throw new AppError('Old password does not matched', 403);
      }

      const generateNewPasswordHashed = await this.hashProvider.generateHash(new_password);

      user_logged.password = generateNewPasswordHashed;
    }

    const userUpdated = {
      ...user_logged,
      premium_pass: undefined
    } as User

    await this.usersRepository.save(userUpdated);

    return {
      user: user_logged
    };
  }
}

export { UpdateUserUseCase };
