import { Request, Response } from 'express';
import { ListCharactersUseCase } from './ListCharactersUseCase'

class ListCharactersController {
    constructor(private listCharactersUseCase: ListCharactersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { characters } = await this.listCharactersUseCase.execute();

    return response.status(200).json({
      characters
    });
  }
}

export { ListCharactersController };
