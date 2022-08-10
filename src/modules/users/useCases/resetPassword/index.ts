import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider'
import { UsersRepository } from '../../repositories/implementations/UsersRepository'
import { UserTokensRepository } from '../../repositories/implementations/UserTokensRepository'
import { ResetPasswordController } from './ResetPasswordController'
import { ResetPasswordUseCase } from './ResetPasswordUseCase'

const usersRepository = new UsersRepository()
const userTokensRepository = new UserTokensRepository()
const bcryptHashProvider = new BCryptHashProvider()


const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository, userTokensRepository, bcryptHashProvider)

const resetPasswordController = new ResetPasswordController(resetPasswordUseCase)

export {
    resetPasswordController,
}

