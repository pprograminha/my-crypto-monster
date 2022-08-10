import { Request, Response } from 'express';
import { ShowCharacterUseCase } from './ShowCharacterUseCase'

class ShowCharacterController {
    constructor(private showCharacterUseCase: ShowCharacterUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { character_id } = request.query;

    const { character } = await this.showCharacterUseCase.execute(character_id as string);

    return response.status(200).json({
      character
    });
  }
}

export { ShowCharacterController };
