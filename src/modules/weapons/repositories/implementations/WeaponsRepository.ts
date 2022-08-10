import { v4 as uuid } from 'uuid';
import { IWeaponsRepository, CreateWeaponDTO } from '../IWeaponsRepository';
import { prisma } from '../../../../shared/prisma/client';
import { Weapon } from '@prisma/client';

class WeaponsRepository implements IWeaponsRepository {
  async destroy(weapon_id: string): Promise<void> {
    await prisma.weapon.delete({
      where: {
        id: weapon_id,
      }
    });
  }
  async findByCharacterId(character_id: string): Promise<Weapon | null> {
    return prisma.weapon.findUnique({
      where: {
        character_id
      },
    });
  }

  async findById(
    weapon_id: string,
  ): Promise<Weapon | null> {
    return  prisma.weapon.findFirst({
      where: {
        id: weapon_id,
      },
    });
  }

  async create(data: CreateWeaponDTO): Promise<Weapon> {
    return prisma.weapon.create({
      data: {
        id: uuid(),
        ...data 
      },
    });
  }

  async save({
    id: weapon_id,
    ...data
  }: Weapon): Promise<Weapon> {
    return prisma.weapon.update({
      where: {
        id: weapon_id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }

  async findAllWeapons(): Promise<Weapon[]> {
    return prisma.weapon.findMany();
  }
}

export { WeaponsRepository };
