import { Weapon } from '@prisma/client';
import { IWeaponsRepository } from '../../repositories/IWeaponsRepository';

type Response = {
  weapons: { 
    weapon: Weapon
  }[];
}

class ListWeaponsUseCase {
  constructor(
    private weaponsRepository: IWeaponsRepository,
  ) {}

  async execute(): Promise<Response> {
    const weapons = await this.weaponsRepository.findAllWeapons();

    return {
      weapons: weapons.map(weapon => ({
        weapon,
      })),
    }
  }
}

export { ListWeaponsUseCase };
