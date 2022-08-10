import { UserWeapon } from '@prisma/client';
import { CreateUserWeaponDTO, IUserWeaponsRepository } from '../../repositories/IUserWeaponsRepository';

type Response = {
  userWeapon: UserWeapon;
}

export interface CreateUserWeaponData extends CreateUserWeaponDTO {
  weapon_id: string;
}

class CreateUserWeaponUseCase {
  constructor(
    private userWeaponsRepository: IUserWeaponsRepository,
  ) {}

  async execute(data: CreateUserWeaponData): Promise<Response> {
    const userWeapon = await this.userWeaponsRepository.create(data);

    return {
      userWeapon,
    }
  }
}

export { CreateUserWeaponUseCase };
