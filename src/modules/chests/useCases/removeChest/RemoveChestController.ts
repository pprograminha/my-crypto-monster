import { Request, Response } from 'express';
import { RemoveChestUseCase } from './RemoveChestUseCase'

class RemoveChestController {
    constructor(private removeChestUseCase: RemoveChestUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { chest_id } = request.body;
    
    const user_id = request.user.id
    
    await this.removeChestUseCase.execute(chest_id);

    return response.status(204).json();
  }
}

export { RemoveChestController };
