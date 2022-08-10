import { Weapon } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { ICharactersRepository } from '../../../characters/repositories/ICharactersRepository';
import { CreateWeaponRequestDTO, IWeaponsRepository } from '../../repositories/IWeaponsRepository';

type Response = {
  weapon: Weapon;
}

class CreateWeaponUseCase {
  constructor(
    private weaponsRespository: IWeaponsRepository,
    private charactersRespository: ICharactersRepository,
  ) {}

  async execute({
    character_id,
    ...rest
  }: CreateWeaponRequestDTO): Promise<Response> {
    const character = await this.charactersRespository.findById(character_id);

    if(!character) {
      throw new AppError('Character not found', 403);
    }

    const data = {
      character_id,
      ...rest
    }

    const weaponAlreadyAssocietatedWithTheCharacter = await this.weaponsRespository.findByCharacterId(character_id);

    if(weaponAlreadyAssocietatedWithTheCharacter) {
      throw new AppError('Weapon already associetated with the character', 403);
    }
    
    const weapon = await this.weaponsRespository.create(data);

    return {
      weapon,
    }
  }
}

export { CreateWeaponUseCase };
