import { Request, Response } from 'express';
import { MakePremiumPassesValidUseCase } from './MakePremiumPassesValidUseCase';

class MakePremiumPassesValidController {
    constructor(private makePremiumPassesValidUseCase: MakePremiumPassesValidUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { users } = request.body;

    await this.makePremiumPassesValidUseCase.execute(users);

    return response.status(200).json();
  }
}

export { MakePremiumPassesValidController };
