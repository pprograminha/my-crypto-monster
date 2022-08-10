import { Request, Response } from 'express';
import { instanceToInstance } from '../../../../shared/helpers/instanceToInstance';
import { SignInUseCase } from './SignInUserUseCase';

export class SignInController {
    constructor(private signInUseCase: SignInUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const { user, token } = await this.signInUseCase.execute({
      email,
      password,
    });

    return response.status(200).json({
      user: instanceToInstance('user', user),
      token
    });
  }
}
