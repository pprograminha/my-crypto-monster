import { Weapon } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { IWeaponsRepository } from '../../repositories/IWeaponsRepository';

type Response = {
  weapon: Weapon;
}

class ShowWeaponUseCase {
  constructor(
    private weaponsRepository: IWeaponsRepository,
  ) {}

  async execute(weapon_id: string): Promise<Response> {
    const weapon = await this.weaponsRepository.findById(weapon_id);

    if(!weapon) throw new AppError('Weapon not found', 403);

    return {
      weapon,
    }
  }
}

export { ShowWeaponUseCase };
