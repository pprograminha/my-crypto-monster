import { User } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { IHashProvider } from '../../../../shared/providers/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';

type SaveWalletRequestDTO = {
  wallet: string;
  user_id: string;
}

class SaveWalletUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute({
    user_id, 
    wallet
  }: SaveWalletRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    
    if (!user) {
      throw new AppError('User does not exist', 401);
    }
    
    const users = await this.usersRepository.findAllUsers(false);

    users.map(user => {
      if(user.wallet) {
        const matchedWallet = this.hashProvider.compareHashSync(wallet, user.wallet);

        if(matchedWallet) {
          throw new AppError('This wallet already exists', 403);
        }
      }
    })

    const hashedWallet = await this.hashProvider.generateHash(wallet);

    const userUpdated = {
      ...user,
      wallet: hashedWallet,
      premium_pass: undefined
    } as User

    await this.usersRepository.save(userUpdated)
  }
}

export { SaveWalletUseCase };
