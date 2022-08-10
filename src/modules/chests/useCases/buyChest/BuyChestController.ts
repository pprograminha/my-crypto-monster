import { Request, Response } from 'express';
import { BuyChestUseCase } from './BuyChestUseCase'

class BuyChestController {
    constructor(private buyChestUseCase: BuyChestUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    
    const user_id = request.user.id
    
    await this.buyChestUseCase.execute({
      user_id,
      ...data
    });
    
    return response.status(200).json();
  }
}

export { BuyChestController };
