import { Character } from '@prisma/client';
import { ICharactersRepository } from '../../repositories/ICharactersRepository';

type Response = {
  characters: { 
    character: Character
  }[];
}

class ListCharactersUseCase {
  constructor(
    private charactersRepository: ICharactersRepository,
  ) {}

  async execute(): Promise<Response> {
    const characters = await this.charactersRepository.findAllCharacters();

    return {
      characters: characters.map(character => ({
        character,
      })),
    }
  }
}

export { ListCharactersUseCase };
