import { ChestType, Rarity, Sale } from '@prisma/client';
import { addMinutes, isAfter, isBefore } from 'date-fns';
import { AppError } from '../../../../shared/errors/AppError';
import { getRandomInt } from '../../../../shared/helpers/getRandomInt';
import { IBlockchainProvider } from '../../../../shared/providers/IBlockchainProvider';
import { ILogsRepository } from '../../../logs/repositories/ILogsRepositories';
import { IPremiumPassesRepository } from '../../../premium_passes/repositories/IPremiumPassesRepository';
import { IPurchasesRepository } from '../../../sales/repositories/IPurchaseRepository';
import { ISalesRepository } from '../../../sales/repositories/ISalesRepository';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { CreateChestUseCase } from '../createChest/CreateChestUseCase';

type BuyChestRequestDTO = {
  sale_id: string;
  user_id: string;
  tx_hash: string;
}

type Rate = { 
  type: Rarity,
  rate: number
  beforeRateInc: number
  rateInc: number
}

class BuyChestUseCase {
  constructor(
    private salesRepository: ISalesRepository,
    private usersRepository: IUsersRepository,
    private createChestUseCase: CreateChestUseCase,
    private logsRepository: ILogsRepository,
    private blockchainProvider: IBlockchainProvider,
    private premiumPassesRepository: IPremiumPassesRepository,
    private purchasesRepository: IPurchasesRepository,
  ) {}
  
  generateRarity(sale: Sale): Rarity {
    let rates = [
      {
        type: 'common',
        rate: sale.common_rate,
      },
      {
        type: 'rare',
        rate: sale.rare_rate,
      },
      {
        type: 'epic',
        rate: sale.epic_rate,
      },
      {
        type: 'legendary',
        rate: sale.legendary_rate,
      },
      {
        type: 'superlegendary',
        rate: sale.super_legendary_rate,
      }
    ]

    let beforeRateInc = 1 
    let charRateBefore = rates[0].rate
    let rateInc = rates[0].rate

    rates = rates.filter(rate => rate.rate > 0)

    const ratesMapped: Rate[] = rates.map(({
      rate,
      type
    } , index) => {
      
      if(index !== 0) {
        beforeRateInc += charRateBefore
        rateInc += rate
        charRateBefore = rate
      }

      return {
        type,
        rate,
        beforeRateInc,
        rateInc,
      } as Rate
    })
    const generatedRandomNumber = getRandomInt(1, 100);

    const rarity = ratesMapped.find(rate => generatedRandomNumber >= rate.beforeRateInc && generatedRandomNumber <= rate.rateInc)

    if(!rarity) throw new AppError('Something went wrong', 500)

    return rarity.type
  }

  async execute({ sale_id, user_id, tx_hash }: BuyChestRequestDTO): Promise<void> {
    const sale = await this.salesRepository.findById(sale_id);
    
    if(!sale) throw new AppError('Sale not found', 403);

    const user = await this.usersRepository.findById(user_id);
    
    if(!user) throw new AppError('User does not exist', 401);

    if(!user.wallet) throw new AppError('The user needs a wallet to buy a chest', 409);

    let currentDate = new Date()
    
    if(sale.end_date) {
      if(isBefore(sale.end_date, currentDate)) {
        throw new AppError('This event is over', 400)
      }
    }

    if(user.premium_pass && user.premium_pass.used === false) {
      currentDate = addMinutes(currentDate, 30)
    }

    if(isAfter(sale.start_date, currentDate)) {
        throw new AppError('This event is not yet available', 400)
    }

    const purchase = await this.purchasesRepository.findLatestPurchaseBySaleId(sale_id)

    if(purchase) {
      if(isBefore(new Date(), addMinutes(purchase.created_at, 5))) {
        throw new AppError('You can buy a chest only once every 5 minutes', 400)
      }
    }

    await this.blockchainProvider.confirmTransaction({
      tx_hash,
      amount: sale.price,
      from: user.wallet,
    })

    if(sale.quantity > 0) {
      if(sale.type === 'both' || sale.type === 'character') {
        const { chest: charChest } = await this.createChestUseCase.execute({
          rarity: this.generateRarity(sale),
          user_id,
          type: 'character',
        });

        await this.logsRepository.create({
          content: `Bought a chest with a ${charChest.rarity} ${charChest.type}`,
          user_id,
        })
      }

      if(sale.type === 'both' || sale.type === 'weapon') {
        const { chest: weapChest } = await this.createChestUseCase.execute({
          rarity: this.generateRarity(sale),
          user_id,
          type: 'weapon',
        });

        await this.logsRepository.create({
          content: `Bought a chest with a ${weapChest.rarity} ${weapChest.type}`,
          user_id,
        })
      }
      
      sale.quantity -= 1

      await this.salesRepository.save(sale);

      if(user.premium_pass){
        user.premium_pass.used = true

        await this.premiumPassesRepository.save(user.premium_pass)
      }

      await this.purchasesRepository.create({
        sale_id,
        user_id,
      })
    } 
  }
}

export { BuyChestUseCase };
