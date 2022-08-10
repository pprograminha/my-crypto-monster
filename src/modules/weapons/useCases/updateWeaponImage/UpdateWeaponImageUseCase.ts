import { IWeaponsRepository } from '../../repositories/IWeaponsRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { Weapon } from '@prisma/client';
import { IStorageProvider } from '../../../../shared/providers/IStorageProvider';

type Response = {
  weapon: Weapon;
}
type UpdateWeaponImageRequestDTO = {
  image?: string;
  weapon_id: string;
}

class UpdateWeaponImageUseCase {
  constructor(
    private storageProvider: IStorageProvider,
    private weaponsRepository: IWeaponsRepository,
  ) {}

  async execute({
    weapon_id,
    image
  }: UpdateWeaponImageRequestDTO): Promise<Response> {
    const weapon = await this.weaponsRepository.findById(weapon_id);

    if (!weapon) {
      throw new AppError('Weapon does not exist', 403);
    }

    if(!image) {
      throw new AppError('Image is required', 400);
    }

    if(weapon.image) {
      await this.storageProvider.deleteFile(weapon.image, 'weapons');
    }

    weapon.image = image;

    await this.storageProvider.saveFile(image, 'weapons');

    await this.weaponsRepository.save(weapon);

    return {
      weapon
    }
  }
}

export { UpdateWeaponImageUseCase };
