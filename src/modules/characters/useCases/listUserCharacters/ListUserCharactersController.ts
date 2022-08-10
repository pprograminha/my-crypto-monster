import { Request, Response } from 'express';
import { ListUserCharactersUseCase } from './ListUserCharactersUseCase'

class ListUserCharactersController {
    constructor(private listUserCharactersUseCase: ListUserCharactersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { userCharacters } = await this.listUserCharactersUseCase.execute(user_id);

    return response.status(200).json({
      userCharacters
    });
  }
}

export { ListUserCharactersController };
