import { Sale } from '@prisma/client';
import { addMinutes, isAfter, isBefore } from 'date-fns';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

type Response = {
    sales: {
        sale: Sale;
        available: boolean;
    }[],
}

class ListSalesUseCase {
    constructor(
        private salesRepository: ISalesRepository,
        private usersRepository: IUsersRepository,
    ) {}

    async execute(user_id: string): Promise<Response> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exist', 401);
        }

        const sales = await this.salesRepository.listAllSales()
     
        const salesMapped = sales.map(sale => {
            let available = false;
    
            const currentDate = new Date()

            if(isBefore(sale.start_date, currentDate)) {
                available = true;
            } else if (
                user.premium_pass && 
                user.premium_pass.used === false && 
                isAfter(addMinutes(currentDate, 30), sale.start_date)
            ) {
                available = true;
            }

            if(sale.end_date && isBefore(sale.end_date, currentDate)) {
                available = false;
            }

            if(sale.quantity === 0) {
                available = false;
            }

            return {
                sale,
                available
            }
        })
        
        return {
            sales: salesMapped,
        }
    }
}

export { ListSalesUseCase };
