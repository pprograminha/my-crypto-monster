import { Request, Response } from 'express';
import { UserHasPremiumPassUseCase } from './UserHasPremiumPassUseCase';

class UserHasPremiumPassController {
    constructor(private userHasPremiumPassUseCase: UserHasPremiumPassUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    const status = await this.userHasPremiumPassUseCase.execute(user_id);

    return response.status(201).json({
      status
    });
  }
}

export { UserHasPremiumPassController };
