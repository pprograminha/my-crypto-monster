import { Response, Request } from 'express'
import { ResetPasswordUseCase } from './ResetPasswordUseCase'

export class ResetPasswordController {
    constructor(private resetPasswordUseCase: ResetPasswordUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body

        await this.resetPasswordUseCase.execute({
            token,
            password
        })

        return response.status(204).json()
    }
}