import { Sale } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../../shared/prisma/client';
import { CreateSaleDTO, ISalesRepository } from '../ISalesRepository';

class SalesRepository implements ISalesRepository {
    async destroy(sale_id: string): Promise<void> {
        await prisma.sale.delete({
            where: {
                id: sale_id
            }
        })
    }
    async findById(sale_id: string): Promise<Sale | null> {
        const sale = await prisma.sale.findUnique({
            where: {
                id: sale_id
            }
        })
        return sale
    }
    async create(data: CreateSaleDTO): Promise<Sale> {
        return prisma.sale.create({
            data: {
                id: uuid(),
                ...data
            }
        })
    }
    async listAllSales(): Promise<Sale[]> {
        return prisma.sale.findMany()
    }
    async save({
        id: sale_id,
        ...data
    }: Sale): Promise<void> {
        await prisma.sale.update({
            data: {
                ...data,
                updated_at: new Date()
            },
            where: {
                id: sale_id
            }
        })
    }
 
}

export { SalesRepository };
