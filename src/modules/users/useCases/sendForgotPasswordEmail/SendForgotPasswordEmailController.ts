import { Response, Request } from 'express'
import { SendForgotPasswordEmailUseCase } from './SendForgotPasswordEmailUseCase'


class SendForgotPasswordEmailController {
    constructor(private sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body
        
        await this.sendForgotPasswordEmailUseCase.execute(email)

        return response.status(204).json()
    }
}

export { SendForgotPasswordEmailController }