import { Request, Response } from 'express';
import { CreateCharacterRequestDTO } from '../../repositories/ICharactersRepository';
import { CreateCharacterUseCase } from './CreateCharacterUseCase'

class CreateCharacterController {
    constructor(private createCharacterUseCase: CreateCharacterUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as CreateCharacterRequestDTO;

    const { character } = await this.createCharacterUseCase.execute(data);

    return response.status(201).json({
      character
    });
  }
}

export { CreateCharacterController };
