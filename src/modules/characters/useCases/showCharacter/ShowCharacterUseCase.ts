import { Character } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { ICharactersRepository } from '../../repositories/ICharactersRepository';

type Response = {
  character: Character;
}

class ShowCharacterUseCase {
  constructor(
    private charactersRepository: ICharactersRepository,
  ) {}

  async execute(character_id: string): Promise<Response> {
    const character = await this.charactersRepository.findById(character_id);

    if(!character) throw new AppError('Character not found', 403);

    return {
      character,
    }
  }
}

export { ShowCharacterUseCase };
