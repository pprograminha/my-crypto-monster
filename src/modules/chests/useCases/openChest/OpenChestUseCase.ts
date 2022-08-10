import { Character } from '@prisma/client';
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

type OpenChestRequestDTO = {
  user_id: string;
  chest_id: string;
}
class OpenChestUseCase {
  constructor(
    private chestsRepository: IChestsRepository,
    private usersRepository: IUsersRepository,
    private charactersRepository: ICharactersRepository,
    private weaponsRepository: IWeaponsRepository,
    private createUserCharacterUseCase: CreateUserCharacterUseCase,
    private createUserWeaponUseCase: CreateUserWeaponUseCase,
    private logsRepository: ILogsRepository,
  ) {}

  async execute({ chest_id, user_id }: OpenChestRequestDTO): Promise<void> {
    const chest = await this.chestsRepository.findById(chest_id);
    
    if(!chest) throw new AppError('Chest not found', 403);

    const user = await this.usersRepository.findById(user_id);
    
    if(!user) throw new AppError('User does not exist', 401);
    
    if(user.id !== chest.user_id) throw new AppError('You can only open your own chests', 403);

    const generatedRandomNumber = getRandomInt(0, 6)

    const rarity = {
      common: 1,
      rare: 1.1,
      epic: 1.15,
      legendary: 1.20,
      superlegendary: 1.30,
    }[chest.rarity]

    switch(chest.type) {
      case 'character':
        const characters: Character[] = await this.charactersRepository.findAllCharacters()

        const character = characters[generatedRandomNumber]

        if(!character) throw new AppError('Character not found', 403);

        const {
          base_atk_physical,
          base_atk_magical,
          base_def_physical,
          base_def_magical,
          base_speed,
          base_health,
          base_crit_chance,
          energy,
          level,
        } = character

        await this.createUserCharacterUseCase.execute({
          user_id: chest.user_id,
          actual_atk_physical: Math.round(base_atk_physical * rarity),
          actual_atk_magical: Math.round(base_atk_magical * rarity),
          actual_def_physical: Math.round(base_def_physical * rarity),
          actual_def_magical: Math.round(base_def_magical * rarity),
          actual_speed: Math.round(base_speed * rarity),
          actual_health: Math.round(base_health * rarity),
          actual_crit_chance: Math.round(base_crit_chance * rarity),
          energy,
          level,
          character_id: character.id,
          rarity: chest.rarity,
          token: uuid(),
        })


        break
      case 'weapon':
        const weapons = await this.weaponsRepository.findAllWeapons()

        const weapon = weapons[generatedRandomNumber]

        if(!weapon) throw new AppError('Weapon not found', 403);
        
        const {
          base_atk_physical: weap_base_atk_physical,
          base_atk_magical: weap_base_atk_magical,
          base_def_physical: weap_base_def_physical,
          base_def_magical: weap_base_def_magical,
          base_speed: weap_base_speed,
          base_health: weap_base_health,
          base_crit_chance: weap_base_crit_chance,
          energy: weap_energy,
          level: weap_level,
        } = weapon

        await this.createUserWeaponUseCase.execute({
          actual_atk_magical: Math.round(weap_base_atk_magical * rarity),
          actual_atk_physical: Math.round(weap_base_atk_physical * rarity),
          actual_def_magical: Math.round(weap_base_def_magical * rarity),
          actual_def_physical: Math.round(weap_base_def_physical * rarity),
          actual_speed: Math.round(weap_base_speed * rarity),
          actual_health: Math.round(weap_base_health * rarity),
          actual_crit_chance: Math.round(weap_base_crit_chance * rarity),
          energy: weap_energy,
          level: weap_level,
          rarity: chest.rarity,
          token: uuid(), // TODO - create a NFT with the blockchain
          user_id: chest.user_id,
          weapon_id: weapon.id,
        })
        
        break
    }
    
    await this.chestsRepository.destroy(chest_id);

    await this.logsRepository.create({
      content: `Opened a chest with a ${chest.rarity} ${chest.type}` ,
      user_id,
    })
  }
}

export { OpenChestUseCase };
