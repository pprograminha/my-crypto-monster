import { Sale, SaleType } from '@prisma/client';

type CreateSaleDTO = {
    start_date: Date;
    end_date: Date;
    price: number;
    crypto: string;
    type: SaleType;
    quantity: number;
    common_rate: number;
    rare_rate: number;
    epic_rate: number;
    legendary_rate: number;
    super_legendary_rate: number;
}

type CreateSaleRequestDTO = CreateSaleDTO;

interface ISalesRepository {
  findById(sale_id: string): Promise<Sale | null>;
  destroy(sale_id: string): Promise<void>;
  create(data: CreateSaleDTO): Promise<Sale>;
  listAllSales(): Promise<Sale[]>;
  save(sale: Sale): Promise<void>;
}
export { ISalesRepository, CreateSaleDTO, CreateSaleRequestDTO };
