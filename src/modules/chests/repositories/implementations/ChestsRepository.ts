import { v4 as uuid } from 'uuid';
import { prisma } from '../../../../shared/prisma/client';
import { Chest } from '@prisma/client';
import { CreateChestDTO, IChestsRepository } from '../IChestRepository';

class ChestsRepository implements IChestsRepository {
  async findAllChestsFromUser(user_id: string): Promise<Chest[]> {
    return prisma.chest.findMany({
      where: {
        OR: [
          { owner_id: user_id },
          { user_id: user_id },
        ]
      },
    });  
  }

  async destroy(chest_id: string): Promise<void> {
    await prisma.chest.delete({
      where: {
        id: chest_id
      },
    });
  }
  async findById(
    register_id: string,
  ): Promise<Chest | null> {
    return prisma.chest.findFirst({
      where: {
        id: register_id
      },
    });
  }

  async create(data: CreateChestDTO): Promise<Chest> {
    return prisma.chest.create({
      data: {
        id: uuid(), 
        owner_id: data.user_id,
        ...data
      },
    });
  }

  async save({
    id: chest_id,
    ...data
  }: Chest): Promise<Chest> {
    return prisma.chest.update({
      where: {
        id: chest_id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }

  async findAllChests(): Promise<Chest[]> {
    return prisma.chest.findMany();
  }
}

export { ChestsRepository };
