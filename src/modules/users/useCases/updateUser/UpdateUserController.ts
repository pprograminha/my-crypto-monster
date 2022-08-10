import { Request, Response } from 'express';
import { instanceToInstance } from '../../../../shared/helpers/instanceToInstance';
import { UpdateUserUseCase } from './UpdateUserUseCase'

class UpdateUserController {
    constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { 
      username, 
      new_password,
      new_password_confirmation,
      old_password,
      role,
    } = request.body;

    const { user } = await this.updateUserUseCase.execute({
      user_id,
      username,
      new_password,
      new_password_confirmation,
      old_password,
      role
    });

    return response.status(200).json({
      user: instanceToInstance('user', user)
    });
  }
}

export { UpdateUserController };
