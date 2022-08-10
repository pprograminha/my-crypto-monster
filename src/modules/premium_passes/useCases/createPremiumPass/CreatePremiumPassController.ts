import { Request, Response } from 'express';
import { CreatePremiumPassUseCase } from './CreatePremiumPassUseCase';

class CreatePremiumPassController {
    constructor(private createPremiumPassUseCase: CreatePremiumPassUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    const { premiumPass } = await this.createPremiumPassUseCase.execute(user_id);

    return response.status(201).json({
        premiumPass
    });
  }
}

export { CreatePremiumPassController };
