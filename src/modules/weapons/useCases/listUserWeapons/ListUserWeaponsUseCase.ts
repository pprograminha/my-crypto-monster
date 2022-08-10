import { UserWeapon } from '@prisma/client';
import { IUserWeaponsRepository } from '../../repositories/IUserWeaponsRepository';

type Response = {
  userWeapons: {
    userWeapon: UserWeapon
  }[];
}

class ListUserWeaponsUseCase {
  constructor(
    private userWeaponsRepository: IUserWeaponsRepository,
  ) {}

  async execute(user_id: string): Promise<Response> {
    const userWeapons = await this.userWeaponsRepository.findAllUserWeaponsByUserId(user_id);

    return {
      userWeapons: userWeapons.map(userWeapon => ({
        userWeapon,
      })),
    }
  }
}

export { ListUserWeaponsUseCase };
