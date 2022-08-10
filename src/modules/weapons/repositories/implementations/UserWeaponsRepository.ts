import { v4 as uuid } from 'uuid';
import { CreateUserWeaponDTO, IUserWeaponsRepository } from '../IUserWeaponsRepository';
import { prisma } from '../../../../shared/prisma/client';
import { UserWeapon } from '@prisma/client';

class UserWeaponsRepository implements IUserWeaponsRepository {
  async findAllByWeaponId(weapon_id: string): Promise<UserWeapon[]> {
    return prisma.userWeapon.findMany({
      where: {
        weapon_id
      },
    });
  }
  async findByOwnerId(
    user_id: string
  ): Promise<UserWeapon | null> {
    return prisma.userWeapon.findFirst({
      where: {
        owner_id: user_id
      },
    });
  }

  async findByWeaponId(
    weapon_id: string,
  ): Promise<UserWeapon | null> {
    return  prisma.userWeapon.findFirst({
      where: {
        weapon: {
          id: weapon_id
        },
      },
    });
  }

  async findById(
    register_id: string,
  ): Promise<UserWeapon | null> {
    return  prisma.userWeapon.findFirst({
      where: {
        id: register_id
      },
    });
  }

  async create(data: CreateUserWeaponDTO): Promise<UserWeapon> {
    return prisma.userWeapon.create({
      data: {
        id: uuid(), 
        owner_id: data.user_id,
        ...data
      },
    });
  }

  async save({
    id,
    ...data
  }: UserWeapon): Promise<UserWeapon> {
    return prisma.userWeapon.update({
      where: {
        id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }

  async findAllUserWeapons(): Promise<UserWeapon[]> {
    return prisma.userWeapon.findMany();
  }

  async findAllUserWeaponsByUserId(user_id: string): Promise<UserWeapon[]> {
    return prisma.userWeapon.findMany({
      where: {
        OR: [
          {
            user_id,
          }, 
          {
            owner_id: user_id
          }
        ]
      },
      include: {
        weapon: true,
      }
    });
  }
}

export { UserWeaponsRepository };
