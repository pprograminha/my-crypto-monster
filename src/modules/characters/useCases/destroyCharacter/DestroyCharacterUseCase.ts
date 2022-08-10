import { Character } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { ICharactersRepository } from '../../repositories/ICharactersRepository';
import { IUserCharactersRepository } from '../../repositories/IUserCharacterRepository';


class DestroyCharacterUseCase {
  constructor(
    private charactersRepository: ICharactersRepository,
    private userCharactersRepository: IUserCharactersRepository,
  ) {}

  async execute(character_id: string): Promise<void> {
    const character = await this.charactersRepository.findById(character_id);

    if(!character) throw new AppError('Character not found', 403);

    const userCharacters = await this.userCharactersRepository.findAllByCharacterId(character_id);

    if(userCharacters.length > 0) {
      throw new AppError('It is not possible to delete a character already in use by players', 403);
    }

    await this.charactersRepository.destroy(character_id);
  }
}

export { DestroyCharacterUseCase };
