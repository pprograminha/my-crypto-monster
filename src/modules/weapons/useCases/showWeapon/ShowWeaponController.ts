import { Request, Response } from 'express';
import { ShowWeaponUseCase } from './ShowWeaponUseCase'

class ShowWeaponController {
    constructor(private showWeaponUseCase: ShowWeaponUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { weapon_id } = request.query;

    const { weapon } = await this.showWeaponUseCase.execute(weapon_id as string);

    return response.status(200).json({
      weapon
    });
  }
}

export { ShowWeaponController };
