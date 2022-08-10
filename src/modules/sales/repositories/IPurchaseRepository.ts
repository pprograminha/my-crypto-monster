import { Purchase } from '@prisma/client';

type CreatePurchaseDTO = {
    sale_id: string;
    user_id: string;
}

type CreatePurchaseRequestDTO = CreatePurchaseDTO;

interface IPurchasesRepository {
  findLatestPurchaseBySaleId(sale_id: string): Promise<Purchase | null>;
  destroy(purchase_id: string): Promise<void>;
  create(data: CreatePurchaseDTO): Promise<Purchase>;
  listAllPurchases(): Promise<Purchase[]>;
  save(purchase: Purchase): Promise<void>;
}
export { IPurchasesRepository, CreatePurchaseDTO, CreatePurchaseRequestDTO };
