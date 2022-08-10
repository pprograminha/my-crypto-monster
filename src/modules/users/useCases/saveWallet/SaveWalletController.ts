import { Request, Response } from 'express';
import { SaveWalletUseCase } from './SaveWalletUseCase'

class SaveWalletController {
    constructor(private saveWalletUseCase: SaveWalletUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        let { wallet } = request.body;

        const user_id = request.user.id;

        await this.saveWalletUseCase.execute({
            wallet: wallet as string,
            user_id,
        });

        return response.status(204).json();
    }
}

export { SaveWalletController };
