import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IPremiumPassesRepository } from '../../repositories/IPremiumPassesRepository';

class MakePremiumPassesValidUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private premiumPassesRepository: IPremiumPassesRepository,
  ) {}

  async execute(users?: string[]): Promise<void> {
    if(!users) return this.premiumPassesRepository.updateAllUsedFieldAsFalse()

    await Promise.all(users.map(async user_id => {
      const user = await this.usersRepository.findById(user_id);
  
      if(!user) return
  
      const premiumPass = await this.premiumPassesRepository.findByUserId(user_id)
  
      if(!premiumPass) return

      premiumPass.used = false
      
      await this.premiumPassesRepository.save(premiumPass)
      
      return true
    }))
  }
}

export { MakePremiumPassesValidUseCase };
