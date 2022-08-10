import { AppError } from '../../../../shared/errors/AppError';
import { ISalesRepository } from '../../repositories/ISalesRepository';


class CancelSaleUseCase {
    constructor(
        private salesRepository: ISalesRepository,
    ) {}

    async execute(sale_id: string): Promise<void> {
        const sale = await this.salesRepository.findById(sale_id);

        if(!sale) {
            throw new AppError('Sale does not exist', 403);
        }

        await this.salesRepository.destroy(sale_id);
    }
}

export { CancelSaleUseCase };
 