import { Character } from '@prisma/client';
import { CreateCharacterRequestDTO, ICharactersRepository } from '../../repositories/ICharactersRepository';

type Response = {
  character: Character;
}

class CreateCharacterUseCase {
  constructor(
    private charactersRepository: ICharactersRepository,
  ) {}

  async execute(data: CreateCharacterRequestDTO): Promise<Response> {
    const character = await this.charactersRepository.create(data);

    return {
      character
    }
  }
}

export { CreateCharacterUseCase };
