import { Request, Response } from 'express';
import { CreateSaleDTO } from '../../repositories/ISalesRepository';
import { CreateSaleUseCase } from './CreateSaleUseCase'

class CreateSaleController {
    constructor(private createSaleUseCase: CreateSaleUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as CreateSaleDTO;

    const { sale } = await this.createSaleUseCase.execute(data);

    return response.status(201).json({
      sale
    });
  }
}

export { CreateSaleController };
