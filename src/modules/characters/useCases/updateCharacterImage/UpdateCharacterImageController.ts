import { Request, Response } from 'express';
import { UpdateCharacterImageUseCase } from './UpdateCharacterImageUseCase'

class UpdateCharacterImageController {
    constructor(private updateCharacterImageUseCase: UpdateCharacterImageUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const image = request.file?.filename;
    const { character_id } = request.body;

    const { character } = await this.updateCharacterImageUseCase.execute({
      character_id,
      image
    });

    return response.status(200).json({
      character
    });
  }
}

export { UpdateCharacterImageController };
