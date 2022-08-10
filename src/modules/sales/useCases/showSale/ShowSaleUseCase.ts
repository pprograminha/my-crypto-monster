import { Sale } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { ISalesRepository } from '../../repositories/ISalesRepository';

type Response = {
  sale: Sale;
}

class ShowSaleUseCase {
  constructor(
    private salesRepository: ISalesRepository,
  ) {}

  async execute(sale_id: string): Promise<Response> {
    const sale = await this.salesRepository.findById(sale_id);

    if(!sale) throw new AppError('Sale not found', 403);

    return {
      sale,
    }
  }
}

export { ShowSaleUseCase };
