import { Request, Response } from 'express';
import { DestroyCharacterUseCase } from './DestroyCharacterUseCase'

class DestroyCharacterController {
    constructor(private destroyCharacterUseCase: DestroyCharacterUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { character_id } = request.body;

    await this.destroyCharacterUseCase.execute(character_id);

    return response.status(204).json();
  }
}

export { DestroyCharacterController };
