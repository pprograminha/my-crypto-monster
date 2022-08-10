import { Weapon, Rarity } from '@prisma/client';

interface CreateWeaponDTO {
  name: string;

  base_atk_physical: number;
  base_atk_magical: number;
  base_def_physical: number;
  base_def_magical: number;
  base_speed: number;
  base_health: number;
  base_crit_chance: number;

  character_id: string;

  energy: number;
  level: number;
}

interface CreateWeaponRequestDTO extends CreateWeaponDTO {}

interface IWeaponsRepository {
  findById(
    id: string,
  ): Promise<Weapon | null>;
  findByCharacterId(
    character_id: string,
  ): Promise<Weapon | null>;
  create(data: CreateWeaponDTO): Promise<Weapon>;
  destroy(weapon_id: string): Promise<void>;
  save(weapon: Weapon): Promise<Weapon>;
  findAllWeapons(): Promise<Weapon[]>;
}

export { IWeaponsRepository, CreateWeaponRequestDTO, CreateWeaponDTO };
