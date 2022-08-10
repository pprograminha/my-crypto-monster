import { Request, Response } from 'express';
import { ListWeaponsUseCase } from './ListWeaponsUseCase'

class ListWeaponsController {
    constructor(private listWeaponsUseCase: ListWeaponsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { weapons } = await this.listWeaponsUseCase.execute();

    return response.status(200).json({
      weapons
    });
  }
}

export { ListWeaponsController };
