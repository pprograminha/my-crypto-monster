import { Request, Response } from 'express';
import { UpdateWeaponImageUseCase } from './UpdateWeaponImageUseCase'

class UpdateWeaponImageController {
    constructor(private updateWeaponImageUseCase: UpdateWeaponImageUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const image = request.file?.filename;
    const { weapon_id } = request.body;

    const { weapon } = await this.updateWeaponImageUseCase.execute({
      weapon_id,
      image
    });

    return response.status(200).json({
      weapon
    });
  }
}

export { UpdateWeaponImageController };
