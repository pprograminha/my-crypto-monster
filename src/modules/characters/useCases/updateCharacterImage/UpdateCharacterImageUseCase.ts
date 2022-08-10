import { ICharactersRepository } from '../../repositories/ICharactersRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { Character } from '@prisma/client';
import { IStorageProvider } from '../../../../shared/providers/IStorageProvider';

type Response = {
  character: Character;
}
type UpdateCharacterImageRequestDTO = {
  image?: string;
  character_id: string;
}

class UpdateCharacterImageUseCase {
  constructor(
    private storageProvider: IStorageProvider,
    private charactersRepository: ICharactersRepository,
  ) {}

  async execute({
    character_id,
    image
  }: UpdateCharacterImageRequestDTO): Promise<Response> {
    const character = await this.charactersRepository.findById(character_id);

    if (!character) {
      throw new AppError('Character does not exist', 403);
    }

    if(!image) {
      throw new AppError('Image is required', 400);
    }

    if(character.image) {
      await this.storageProvider.deleteFile(character.image, 'characters');
    }

    character.image = image;

    await this.storageProvider.saveFile(image, 'characters');

    await this.charactersRepository.save(character);

    return {
      character
    }
  }
}

export { UpdateCharacterImageUseCase };
