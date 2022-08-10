import { Rarity, Sale, SaleType } from '@prisma/client';
import { isBefore } from 'date-fns';
import { AppError } from '../../../../shared/errors/AppError';
import { MakePremiumPassesValidUseCase } from '../../../premium_passes/useCases/makePremiumPassesValid/MakePremiumPassesValidUseCase';
import { CreateSaleDTO, CreateSaleRequestDTO, ISalesRepository } from '../../repositories/ISalesRepository';

type Response = {
  sale: Sale;
}

class CreateSaleUseCase {
    constructor(
        private salesRepository: ISalesRepository,
        private makePremiumPassesValidUseCase: MakePremiumPassesValidUseCase,
    ) {}

    async execute({
        end_date,
        start_date,
        price,
        quantity,
        common_rate,
        rare_rate,
        epic_rate,
        legendary_rate,
        super_legendary_rate,
        ...rest
    }: CreateSaleRequestDTO): Promise<Response> {
        if(isBefore(end_date, start_date)) {
            throw new AppError('The end of the event must be after the start of the event', 400)
        }

        const currentDate = new Date()

        if(isBefore(end_date, currentDate)) {
            throw new AppError('The end of the event must be after the current date', 400)
        }
        
        if(isBefore(start_date, currentDate)) {
            throw new AppError('Event start can only be set on an existing date', 400)
        }

        const ratePercentage = [
            common_rate,
            rare_rate,
            epic_rate,
            legendary_rate,
            super_legendary_rate,
        ].reduce((weapRatePercentage, weapRate) => weapRatePercentage + weapRate, 0)

        if(ratePercentage === 0) {
            throw new AppError('At least a rarity percentage of the weapon must be entered', 400)
        }

        if(ratePercentage !== 100) {
            throw new AppError('The total rarity percentage must be 100', 400)
        }

        const sale = await this.salesRepository.create({
            end_date,
            start_date,
            price,
            quantity,
            common_rate,
            rare_rate,
            epic_rate,
            legendary_rate,
            super_legendary_rate,
            ...rest,
        })

        await this.makePremiumPassesValidUseCase.execute()

        return {
            sale
        }
    }
}

export { CreateSaleUseCase };
