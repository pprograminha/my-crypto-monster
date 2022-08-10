import { PremiumPass } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IPremiumPassesRepository } from '../../repositories/IPremiumPassesRepository';


class DeletePremiumPassUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private premiumPassesRepository: IPremiumPassesRepository,
  ) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
        throw new AppError('User does not exist', 409);
    }

    const premiumPass = await this.premiumPassesRepository.findByUserId(user_id)

    if(!premiumPass) {
        throw new AppError('Premium pass does not exist', 409);
    }
    
    await this.premiumPassesRepository.destroy(premiumPass.id)
  }
}

export { DeletePremiumPassUseCase };
