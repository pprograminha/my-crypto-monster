import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IPremiumPassesRepository } from '../../repositories/IPremiumPassesRepository';

class UserHasPremiumPassUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private premiumPassesRepository: IPremiumPassesRepository,
  ) {}

  async execute(user_id: string): Promise<boolean> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
      throw new AppError('User does not exist', 409);
    }

    const premiumPass = await this.premiumPassesRepository.findByUserId(user_id)

    if(!premiumPass || premiumPass.used === true) {
      return false
    }
    
    return true
  }
}

export { UserHasPremiumPassUseCase };
