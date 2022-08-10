import { Request, Response } from 'express';
import { ListSalesUseCase } from './ListSalesUseCase'

class ListSalesController {
    constructor(private listSalesUseCase: ListSalesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { sales } = await this.listSalesUseCase.execute(user_id);

    return response.status(200).json({
      sales,
    });
  }
}

export { ListSalesController };
