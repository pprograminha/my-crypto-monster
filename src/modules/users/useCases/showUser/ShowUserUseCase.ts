import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { User } from '@prisma/client';

type ShowUserRequestDTO = {
  username?: string;
  user_id?: string;
}
type Response = { 
  user: User;
}
class ShowUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    username,
    user_id
  }: ShowUserRequestDTO): Promise<Response> {
    let user: User | null = null;

    if (user_id) {
      user = await this.usersRepository.findById(
        user_id,
      );
    } else if (username) {
      user = await this.usersRepository.findByUsername(
        username,
      );
    } 

    if (!user || user.role === 'admin' && !user_id) {
      throw new AppError('Could not show user', 401);
    }

    return {
      user
    };
  }
}

export { ShowUserUseCase };
