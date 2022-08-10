import { UserCharacter } from '@prisma/client';
import { CreateUserCharacterDTO, IUserCharactersRepository } from '../../repositories/IUserCharacterRepository';

type Response = {
  userCharacter: UserCharacter;
}

type CreateUserCharacterRequestDTO = {} & CreateUserCharacterDTO

class CreateUserCharacterUseCase {
  constructor(
    private userCharactersRespository: IUserCharactersRepository,
  ) {}

  async execute(data: CreateUserCharacterRequestDTO): Promise<Response> {
    const userCharacter = await this.userCharactersRespository.create(data);

    return {
      userCharacter,
    }
  }
}

export { CreateUserCharacterUseCase, CreateUserCharacterRequestDTO };
