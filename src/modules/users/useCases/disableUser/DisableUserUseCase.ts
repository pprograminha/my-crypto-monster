import { User } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

class DisableUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const userUpdated = {
      ...user,
      enabled: false,
      premium_pass: undefined
    } as User

    await this.usersRepository.save(userUpdated)
  }
}

export { DisableUserUseCase };
