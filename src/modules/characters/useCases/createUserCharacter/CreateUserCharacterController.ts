import { Request, Response } from 'express';
import { CreateUserCharacterRequestDTO, CreateUserCharacterUseCase } from './CreateUserCharacterUseCase';

class CreateUserCharacterController {
    constructor(private createUserCharacterUseCase: CreateUserCharacterUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body
    const user_id = request.user.id;

    const user_character_data = {
      ...data,
      user_id
    } as CreateUserCharacterRequestDTO

    const { userCharacter } = await this.createUserCharacterUseCase.execute(user_character_data);

    return response.status(201).json({
      userCharacter
    });
  }
}

export { CreateUserCharacterController };
