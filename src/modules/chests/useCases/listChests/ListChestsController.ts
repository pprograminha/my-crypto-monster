import { Request, Response } from 'express';
import { ListChestsUseCase } from './ListChestsUseCase'

class ListChestsController {
    constructor(private listChestsUseCase: ListChestsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { me } = request.query;

    let user_id: string | undefined;
    
    if(me) {
      user_id = request.user.id;
    }

    const { chests } = await this.listChestsUseCase.execute(user_id);

    return response.status(200).json({
      chests,
    });
  }
}

export { ListChestsController };
