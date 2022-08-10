import { Request, Response } from 'express';
import { instanceToInstance } from '../../../../shared/helpers/instanceToInstance';
import { ShowUserUseCase } from './ShowUserUseCase'

class ShowUserController {
    constructor(private showUserUseCase: ShowUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.query;
    const user_id = request.user.id;

    const { user } = await this.showUserUseCase.execute({
        ...(
            username ? {
                username: username as string,
            } : {
                user_id
            }
        )
    });

    return response.status(200).json({
        user: instanceToInstance('user', user)
    });
  }
}

export { ShowUserController };
