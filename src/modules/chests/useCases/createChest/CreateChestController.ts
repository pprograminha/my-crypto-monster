import { Request, Response } from 'express';
import { CreateChestRequestDTO } from '../../repositories/IChestRepository';
import { CreateChestUseCase } from './CreateChestUseCase'

class CreateChestController {
  constructor(private createChestUseCase: CreateChestUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as CreateChestRequestDTO;

    const { chest } = await this.createChestUseCase.execute(data);

    return response.status(201).json({
      chest
    });
  }
}

export { CreateChestController };
