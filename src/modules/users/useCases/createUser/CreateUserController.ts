import { Request, Response } from 'express';
import { instanceToInstance } from '../../../../shared/helpers/instanceToInstance';
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, username, password } = request.body;

    const { user, token } = await this.createUserUseCase.execute({
      email,
      username,
      password,
    });

    return response.status(201).json({
      user: instanceToInstance('user', user),
      token
    });
  }
}

export { CreateUserController };
