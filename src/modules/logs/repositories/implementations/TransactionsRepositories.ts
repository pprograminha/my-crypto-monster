import { Transaction } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../../shared/prisma/client';
import { CreateTransactionDTO, ITransactionsRepository } from '../ITransactionsRepositories';

class TransactionsRepository implements ITransactionsRepository {
  async listAllTransactionsFromWallet(wallet: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
        where: {
            wallet
        }
    });

    return transactions 
  }
  
  async findByTxHash(tx_hash: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({
        where: {
            tx_hash
        }
    });

    return transaction 
  }
  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const transaction = await prisma.transaction.create({
      data: {
        id: uuid(),
        ...data
      },
    });

    return transaction 
  }
  
  async listAllTransactions(): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany();

    return transactions 
  }


}

export { TransactionsRepository };
