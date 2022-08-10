import { Request, Response } from 'express';
import { CreateUserWeaponData, CreateUserWeaponUseCase } from './CreateUserWeaponUseCase'

class CreateUserWeaponController {
    constructor(private createUserWeaponUseCase: CreateUserWeaponUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const character_data = request.body as CreateUserWeaponData;

    const { userWeapon } = await this.createUserWeaponUseCase.execute(character_data);

    return response.status(201).json({
      userWeapon
    });
  }
}

export { CreateUserWeaponController };
