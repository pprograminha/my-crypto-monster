import { Request, Response } from 'express';
import { ListLogsUseCase } from './ListLogsUseCase'

class ListLogsController {
    constructor(private listLogsUseCase: ListLogsUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.query;

        const _response = await this.listLogsUseCase.execute(user_id as string);

        return response.status(200).json({
            logs: _response
        });
    }
}

export { ListLogsController };
