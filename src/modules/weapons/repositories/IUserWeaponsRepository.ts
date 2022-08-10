import { Rarity, UserWeapon } from '@prisma/client';

export interface CreateUserWeapon {
  rarity: Rarity;
  token: string
  
  weapon_id: string;
  actual_atk_physical: number;
  actual_atk_magical: number;
  actual_def_physical: number;
  actual_def_magical: number;
  actual_speed: number;
  actual_health: number;
  actual_crit_chance: number;

  energy: number;
  level: number;
}

interface CreateUserWeaponDTO extends CreateUserWeapon {
  user_id: string;
}

interface IUserWeaponsRepository {
  findById(
    id: string,
  ): Promise<UserWeapon | null>;
  findByOwnerId(
    id: string,
  ): Promise<UserWeapon | null>;
  create(data: CreateUserWeaponDTO): Promise<UserWeapon>;
  save(user_weapons: UserWeapon): Promise<UserWeapon>;
  findAllByWeaponId(weapon_id: string): Promise<UserWeapon[]>;
  findAllUserWeapons(): Promise<UserWeapon[]>;
  findAllUserWeaponsByUserId(user_id: string): Promise<UserWeapon[]>;
}
export { IUserWeaponsRepository, CreateUserWeaponDTO };
