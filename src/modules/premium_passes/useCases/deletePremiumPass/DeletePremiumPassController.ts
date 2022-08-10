import { Request, Response } from 'express';
import { DeletePremiumPassUseCase } from './DeletePremiumPassUseCase';

class DeletePremiumPassController {
    constructor(private deletePremiumPassUseCase: DeletePremiumPassUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    await this.deletePremiumPassUseCase.execute(user_id);

    return response.status(204).json();
  }
}

export { DeletePremiumPassController };
