import { PremiumPass } from '@prisma/client';

type CreatePremiumPassDTO = {
    user_id: string
}

type CreatePremiumPassRequestDTO = {} & Omit<CreatePremiumPassDTO, 'type'>;

interface IPremiumPassesRepository {
  findById(premium_pass_id: string): Promise<PremiumPass | null>;
  findByUserId(user_id: string): Promise<PremiumPass | null>;
  destroy(premium_pass_id: string): Promise<void>;
  create(data: CreatePremiumPassDTO): Promise<PremiumPass>;
  listAllPremiumPasses(): Promise<PremiumPass[]>;
  updateAllUsedFieldAsFalse(): Promise<void>;
  save(premium_pass: PremiumPass): Promise<void>;
}
export { IPremiumPassesRepository, CreatePremiumPassDTO, CreatePremiumPassRequestDTO };
