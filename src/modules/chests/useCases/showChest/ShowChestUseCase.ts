import { Character, Chest } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { AppError } from '../../../../shared/errors/AppError';
import { getRandomInt } from '../../../../shared/helpers/getRandomInt';
import { ICharactersRepository } from '../../../characters/repositories/ICharactersRepository';
import { CreateUserCharacterUseCase } from '../../../characters/useCases/createUserCharacter/CreateUserCharacterUseCase';
import { ILogsRepository } from '../../../logs/repositories/ILogsRepositories';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IWeaponsRepository } from '../../../weapons/repositories/IWeaponsRepository';
import { CreateUserWeaponUseCase } from '../../../weapons/useCases/createUserWeapon/CreateUserWeaponUseCase';
import { IChestsRepository } from '../../repositories/IChestRepository';

type ShowChestRequestDTO = {
  chest_id: string;
}

type Response = {
  chest: Chest;
}

class ShowChestUseCase {
  constructor(
    private chestsRepository: IChestsRepository,
  ) {}

  async execute({ chest_id }: ShowChestRequestDTO): Promise<Response> {
    const chest = await this.chestsRepository.findById(chest_id);
    
    if(!chest) throw new AppError('Chest not found', 403);

    return {
      chest,
    }
  }
}

export { ShowChestUseCase };
