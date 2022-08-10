import { v4 as uuid } from 'uuid';
import { CreateUserCharacterDTO, IUserCharactersRepository } from '../IUserCharacterRepository';
import { prisma } from '../../../../shared/prisma/client';
import { UserCharacter } from '@prisma/client';

class UserCharactersRepository implements IUserCharactersRepository {
  async findByOwnerId(
    user_id: string
  ): Promise<UserCharacter | null> {
    return prisma.userCharacter.findFirst({
      where: {
        owner_id: user_id
      },
    });
  }

  async findAllByCharacterId(
    character_id: string,
  ): Promise<UserCharacter[]> {
    return prisma.userCharacter.findMany({
      where: {
        character: {
          id: character_id
        },
      },
    });
  }

  async findById(
    register_id: string,
  ): Promise<UserCharacter | null> {
    return  prisma.userCharacter.findFirst({
      where: {
        id: register_id
      },
    });
  }

  async create(data: CreateUserCharacterDTO): Promise<UserCharacter> {
    return prisma.userCharacter.create({
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
  }: UserCharacter): Promise<UserCharacter> {
    return prisma.userCharacter.update({
      where: {
        id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }

  async findAllUserCharacters(): Promise<UserCharacter[]> {
    return prisma.userCharacter.findMany();
  }

  async findAllUserCharactersByUserId(user_id: string): Promise<UserCharacter[]> {
    return prisma.userCharacter.findMany({
      where: {
        OR: [
          {
            user_id
          },
          {
            owner_id: user_id
          }
        ]
      },
      include: {
        character: true
      }
    });    
  }
}

export { UserCharactersRepository };
