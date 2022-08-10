import { Request, Response } from 'express';
import { ListUserWeaponsUseCase } from './ListUserWeaponsUseCase'

class ListUserWeaponsController {
    constructor(private listUserWeaponsUseCase: ListUserWeaponsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { userWeapons } = await this.listUserWeaponsUseCase.execute(user_id);

    return response.status(200).json({
      userWeapons
    });
  }
}

export { ListUserWeaponsController };
