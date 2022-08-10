import { Request, Response } from 'express';
import { DisableUserUseCase } from './DisableUserUseCase'

class DisableUserController {
    constructor(private disableUserUseCase: DisableUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.body;

        await this.disableUserUseCase.execute(user_id);

        return response.status(204).json();
    }
}

export { DisableUserController };
