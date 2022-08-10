import { Chest } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { CreateChestRequestDTO, IChestsRepository } from '../../repositories/IChestRepository';

type Response = {
  chest: Chest;
}

class CreateChestUseCase {
  constructor(
    private chestsRepository: IChestsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_id,
    influencer,
    rarity,
    type,
    token,
  }: CreateChestRequestDTO): Promise<Response> {
    const tokenGenerated = token || uuid();

    const user = await this.usersRepository.findById(user_id);
    
    if(!user) {
      throw new AppError('User does not exist', 401)
    }

    const chest = await this.chestsRepository.create({
      influencer,
      rarity,
      token: tokenGenerated,
      type,
      user_id,
    })

    return {
      chest
    }
  }
}

export { CreateChestUseCase };
