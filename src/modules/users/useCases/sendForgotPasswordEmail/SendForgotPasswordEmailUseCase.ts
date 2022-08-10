
import path from 'path'
import { AppError } from '../../../../shared/errors/AppError'
import { IMailProvider } from '../../../../shared/providers/IMailProvider'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository'

class SendForgotPasswordEmailUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private userTokensRepository: IUserTokensRepository
  ) { }
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('User does not exists.', 409)

    const userToken = await this.userTokensRepository.findByUserId(user.id)

    if(userToken) {
      await this.userTokensRepository.destroy(userToken.id)
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplatePath = path.resolve(__dirname, '..', '..', 'views', 'forgotPasswordEmailTemplate.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: user.username,
        address: user.email,
      },
      subject: 'Recuperação de senha.',
      templateData: {
        file: forgotPasswordTemplatePath,
        variables: {
          name: user.username,
          redirect: `${process.env.APP_WEB_URL}/reset-password?token=${token}`
        }
      }
    })


  }
}

export { SendForgotPasswordEmailUseCase }