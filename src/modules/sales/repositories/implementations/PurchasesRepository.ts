import { Purchase } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../../shared/prisma/client';
import { CreatePurchaseDTO, IPurchasesRepository } from '../IPurchaseRepository';

class PurchasesRepository implements IPurchasesRepository {
    async findLatestPurchaseBySaleId(sale_id: string): Promise<Purchase | null> {
        const purchase = await prisma.purchase.findFirst({
            where: {
                sale_id
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return purchase
    }
    async destroy(purchase_id: string): Promise<void> {
        await prisma.purchase.delete({
            where: {
                id: purchase_id
            }
        })
    }
    async create(data: CreatePurchaseDTO): Promise<Purchase> {
        return prisma.purchase.create({
            data: {
                id: uuid(),
                ...data
            }
        })
    }
    async listAllPurchases(): Promise<Purchase[]> {
        return prisma.purchase.findMany()
    }
    async save({
        id: purchase_id,
        ...data
    }: Purchase): Promise<void> {
        await prisma.purchase.update({
            data: {
                ...data,
                updated_at: new Date()
            },
            where: {
                id: purchase_id
            }
        })
    }
 
}

export { PurchasesRepository };
