import { Request, Response } from 'express';
import { CreateWeaponRequestDTO } from '../../repositories/IWeaponsRepository';
import { CreateWeaponUseCase } from './CreateWeaponUseCase'

class CreateWeaponController {
    constructor(private createWeaponUseCase: CreateWeaponUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as CreateWeaponRequestDTO;

    const { weapon } = await this.createWeaponUseCase.execute(data);

    return response.status(201).json({
      weapon
    });
  }
}

export { CreateWeaponController };
