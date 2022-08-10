import { UserCharacter } from '@prisma/client';
import { IUserCharactersRepository } from '../../repositories/IUserCharacterRepository';

type Response = {
  userCharacters: {
    userCharacter: UserCharacter
  }[];
}

class ListUserCharactersUseCase {
  constructor(
    private userCharactersRepository: IUserCharactersRepository,
  ) {}

  async execute(user_id: string): Promise<Response> {
    const userCharacters = await this.userCharactersRepository.findAllUserCharactersByUserId(user_id);

    return {
      userCharacters: userCharacters.map(userCharacter => ({
        userCharacter,
      })),
    }
  }
}

export { ListUserCharactersUseCase };
