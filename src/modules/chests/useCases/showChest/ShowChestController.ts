
import { Request, Response } from 'express';
import { ShowChestUseCase } from './ShowChestUseCase'

class ShowChestController {
    constructor(private showChestUseCase: ShowChestUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { chest_id } = request.body;
    
    const { chest } = await this.showChestUseCase.execute({
      chest_id,
    });

    return response.status(204).json({
      chest
    });
  }
}

export { ShowChestController };
