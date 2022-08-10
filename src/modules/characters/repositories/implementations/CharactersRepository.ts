import { Character } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../../shared/prisma/client';
import { CreateCharacterDTO, ICharactersRepository } from '../ICharactersRepository';

class CharactersRepository implements ICharactersRepository {
  async destroy(character_id: string): Promise<void> {
    await prisma.character.delete({
      where: {
        id: character_id,
      },
    });
  }
  async findById(
    character_id: string,
  ): Promise<Character | null> {
    return  prisma.character.findFirst({
      where: {
        id: character_id,
      },
    });
  }

  async create(data: CreateCharacterDTO): Promise<Character> {
    return prisma.character.create({
      data: {
        id: uuid(), 
        ...data
      },
    });
  }

  async save({
    id: character_id,
    ...data
  }: Character): Promise<Character> {
    return prisma.character.update({
      where: {
        id: character_id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }

  async findAllCharacters(): Promise<Character[]> {
    return prisma.character.findMany();
  }
}

export { CharactersRepository };
