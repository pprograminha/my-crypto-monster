import { v4 as uuid } from 'uuid';
import { PremiumPass } from '@prisma/client';
import { prisma } from '../../../../shared/prisma/client';
import { CreatePremiumPassDTO, IPremiumPassesRepository } from '../IPremiumPassesRepository';


class PremiumPassesRepository implements IPremiumPassesRepository {
  async updateAllUsedFieldAsFalse(): Promise<void> {
    await prisma.premiumPass.updateMany({
        data: {
            used: false
        }
    })
  }
  async findByUserId(user_id: string): Promise<PremiumPass | null> {
    return prisma.premiumPass.findUnique({
      where: {
          user_id
      }
  })
  }
  async findById(premium_pass_id: string): Promise<PremiumPass | null> {
    return prisma.premiumPass.findUnique({
        where: {
            id: premium_pass_id
        }
    })
  }

  async destroy(premium_pass_id: string): Promise<void> {
    await prisma.premiumPass.delete({
        where: {
            id: premium_pass_id
        }
     })
  }

  async create(data: CreatePremiumPassDTO): Promise<PremiumPass> {
    return prisma.premiumPass.create({
       data: {
            id: uuid(),
            ...data
       }
    })
  }
  async listAllPremiumPasses(): Promise<PremiumPass[]> {
    return prisma.premiumPass.findMany()
  }
  async save({
    id: premium_pass_id,
    ...data   
  }: PremiumPass): Promise<void> {
    await prisma.premiumPass.update({
        data: {
            id: uuid(),
            ...data,
            updated_at: new Date()
        },
        where: {
            id: premium_pass_id
        }
     })
  }
}
export { PremiumPassesRepository };
