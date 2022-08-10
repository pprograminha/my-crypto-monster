import { Character, Rarity } from '@prisma/client';

interface CreateCharacterDTO {
    rarity: Rarity,
	name: string

	base_atk_physical: number,
	base_atk_magical: number,
	base_def_physical: number,
	base_def_magical: number,
	base_speed: number,
	base_health: number,
	base_crit_chance: number,

	energy: number,
	level: number
}

interface CreateCharacterRequestDTO extends CreateCharacterDTO {}

interface ICharactersRepository {
  findById(
    id: string,
  ): Promise<Character | null>;
  create(data: CreateCharacterDTO): Promise<Character>;
  destroy(character_id: string): Promise<void>;
  save(character: Character): Promise<Character>;
  findAllCharacters(): Promise<Character[]>;
}
export { ICharactersRepository, CreateCharacterDTO, CreateCharacterRequestDTO };
