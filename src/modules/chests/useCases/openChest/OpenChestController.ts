import { Request, Response } from 'express';
import { OpenChestUseCase } from './OpenChestUseCase'

class OpenChestController {
    constructor(private openChestUseCase: OpenChestUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { chest_id } = request.body;
    
    const user_id = request.user.id
    
    await this.openChestUseCase.execute({
      chest_id,
      user_id
    });

    return response.status(204).json();
  }
}

export { OpenChestController };
