import { Rarity, UserCharacter } from '@prisma/client';

type CreateUserCharacterDTO = {
  rarity: Rarity;
  character_id: string;
  token: string;
  user_id: string;
  actual_atk_physical: number;
  actual_atk_magical: number;
  actual_def_physical: number;
  actual_def_magical: number;
  actual_speed: number;
  actual_health: number;
  actual_crit_chance: number;

  energy: number;
  level: number;
}


interface IUserCharactersRepository {
  findById(
    id: string,
  ): Promise<UserCharacter | null>;
  findByOwnerId(
    id: string,
  ): Promise<UserCharacter | null>;

  findAllByCharacterId(
    character_id: string,
  ): Promise<UserCharacter[]>;

  create(data: CreateUserCharacterDTO): Promise<UserCharacter>;
  save(user_weapons: UserCharacter): Promise<UserCharacter>;
  findAllUserCharacters(): Promise<UserCharacter[]>;
  findAllUserCharactersByUserId(user_id: string): Promise<UserCharacter[]>;
}
export { IUserCharactersRepository, CreateUserCharacterDTO };
