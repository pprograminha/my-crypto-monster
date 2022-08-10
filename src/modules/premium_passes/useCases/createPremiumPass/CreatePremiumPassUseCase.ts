import { PremiumPass } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IPremiumPassesRepository } from '../../repositories/IPremiumPassesRepository';

type Response = {
    premiumPass: PremiumPass;
}

class CreatePremiumPassUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private premiumPassesRepository: IPremiumPassesRepository,
  ) {}

  async execute(user_id: string): Promise<Response> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
        throw new AppError('User does not exist', 409);
    }

    const checkPremiumPass = await this.premiumPassesRepository.findByUserId(user_id)

    if(checkPremiumPass) {
        throw new AppError('User already has a premium pass', 409);
    }
    const premiumPass = await this.premiumPassesRepository.create({
        user_id,
    })
    
    return {
        premiumPass
    };
  }
}

export { CreatePremiumPassUseCase };
