import { Request, Response } from 'express';
import { DestroyWeaponUseCase } from './DestroyWeaponUseCase'

class DestroyWeaponController {
    constructor(private destroyWeaponUseCase: DestroyWeaponUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { weapon_id } = request.body;

    await this.destroyWeaponUseCase.execute(weapon_id);

    return response.status(204).json();
  }
}

export { DestroyWeaponController };
