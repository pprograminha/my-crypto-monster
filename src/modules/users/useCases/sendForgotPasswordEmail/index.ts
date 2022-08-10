import { mailConfig } from '../../../../config/mail'
import { HandlebarsMailTemplateProvider } from '../../../../shared/providers/HandlebarsMailTemplateProvider'
import { EtherealMailProvider } from '../../../../shared/providers/implementations/EtherealMailProvider'
import { SESMailProvider } from '../../../../shared/providers/implementations/SESMailProvider'
import { UsersRepository } from '../../repositories/implementations/UsersRepository'
import { UserTokensRepository } from '../../repositories/implementations/UserTokensRepository'
import { SendForgotPasswordEmailController } from './SendForgotPasswordEmailController'
import { SendForgotPasswordEmailUseCase } from './SendForgotPasswordEmailUseCase'

const usersRepository = new UsersRepository()
const handlebarsMailTemplateProvider = new HandlebarsMailTemplateProvider()
const userTokensRepository = new UserTokensRepository()

const mailProvider = {
    ses: new SESMailProvider(handlebarsMailTemplateProvider),
    ethereal: new EtherealMailProvider(handlebarsMailTemplateProvider),
}[mailConfig.driver]

const sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(usersRepository, mailProvider, userTokensRepository)

const sendForgotPasswordEmailController = new SendForgotPasswordEmailController(sendForgotPasswordEmailUseCase)

export {
  sendForgotPasswordEmailController,
}
