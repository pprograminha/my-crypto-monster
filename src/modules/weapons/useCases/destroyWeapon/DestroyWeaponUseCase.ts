import { AppError } from '../../../../shared/errors/AppError';
import { IUserWeaponsRepository } from '../../repositories/IUserWeaponsRepository';
import { IWeaponsRepository } from '../../repositories/IWeaponsRepository';


class DestroyWeaponUseCase {
  constructor(
    private weaponsRepository: IWeaponsRepository,
    private userWeaponsRepository: IUserWeaponsRepository,
  ) {}

  async execute(weapon_id: string): Promise<void> {
    const character = await this.weaponsRepository.findById(weapon_id);

    if(!character) throw new AppError('Character not found', 403);

    const userWeapons = await this.userWeaponsRepository.findAllByWeaponId(weapon_id);

    if(userWeapons.length > 0) {
      throw new AppError('It is not possible to delete a weapon already in use by players', 403);
    }

    await this.weaponsRepository.destroy(weapon_id);
  }
}

export { DestroyWeaponUseCase };
