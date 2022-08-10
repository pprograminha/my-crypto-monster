import { Request, Response } from 'express';
import { ShowSaleUseCase } from './ShowSaleUseCase'

class ShowSaleController {
    constructor(private showSaleUseCase: ShowSaleUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { sale_id } = request.query;

    const { sale } = await this.showSaleUseCase.execute(sale_id as string);

    return response.status(200).json({
      sale
    });
  }
}

export { ShowSaleController };
