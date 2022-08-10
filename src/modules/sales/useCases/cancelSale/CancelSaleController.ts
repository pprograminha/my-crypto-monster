import { Request, Response } from 'express';
import { CancelSaleUseCase } from './CancelSaleUseCase';

class CancelSaleController {
  constructor(private cancelSaleUseCase: CancelSaleUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { sale_id } = request.body;

    await this.cancelSaleUseCase.execute(sale_id);

    return response.status(204).json();
  }
}

export { CancelSaleController };
