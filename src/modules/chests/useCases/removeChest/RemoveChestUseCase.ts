import { AppError } from '../../../../shared/errors/AppError';
import { IChestsRepository } from '../../repositories/IChestRepository';

class RemoveChestUseCase {
  constructor(
    private chestsRepository: IChestsRepository,
  ) {}

  async execute(chest_id: string): Promise<void> {
    const chest = await this.chestsRepository.findById(chest_id);
    
    if(!chest) throw new AppError('Chest not found', 403);

    await this.chestsRepository.destroy(chest_id);
  }
}

export { RemoveChestUseCase };
