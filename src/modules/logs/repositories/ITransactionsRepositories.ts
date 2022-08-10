import { Transaction } from '@prisma/client';

type CreateTransactionDTO = {
  wallet: string;
  tx_hash: string;
}

interface ITransactionsRepository {
  create(data: CreateTransactionDTO): Promise<Transaction>;
  listAllTransactions(): Promise<Transaction[]>;
  findByTxHash(tx_hash: string): Promise<Transaction | null>;
  listAllTransactionsFromWallet(wallet: string): Promise<Transaction[]>;
}
export { ITransactionsRepository, CreateTransactionDTO };
