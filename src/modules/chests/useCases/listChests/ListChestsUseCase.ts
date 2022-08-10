

import { Chest } from '@prisma/client';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IChestsRepository } from '../../repositories/IChestRepository';

type Response = {
    chests: {
        chest: Chest;
    }[],
}

class ListChestsUseCase {
    constructor(
        private chestsRepository: IChestsRepository,
        private usersRepository: IUsersRepository,
    ) {}

    async execute(user_id?: string): Promise<Response> {
        let chests: Chest[] = [];

        if(user_id) {
            const user = await this.usersRepository.findById(user_id);
    
            if (!user) {
                throw new AppError('User does not exist', 401);
            }

            chests = await this.chestsRepository.findAllChestsFromUser(user_id);
        } else {
            chests = await this.chestsRepository.findAllChests()
        }


        return {
            chests: chests.map(chest => ({ chest })),
        }
    }
}

export { ListChestsUseCase };
