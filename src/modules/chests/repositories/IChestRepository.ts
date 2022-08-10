import { Chest, ChestType, Rarity } from '@prisma/client';

interface CreateChestDTO {
  rarity: Rarity;
  type: ChestType;
  token: string
  influencer?: boolean;
  user_id: string;
}

interface CreateChestRequestDTO extends Omit<CreateChestDTO, 'token'> {
  token?: string;
}

interface IChestsRepository {
  findById(
    id: string,
  ): Promise<Chest | null>;
  destroy(chest_id: string): Promise<void>;
  create(data: CreateChestDTO): Promise<Chest>;
  save(chest: Chest): Promise<Chest>;
  findAllChestsFromUser(user_id: string): Promise<Chest[]>;
  findAllChests(): Promise<Chest[]>;
}
export { IChestsRepository, CreateChestRequestDTO, CreateChestDTO };
