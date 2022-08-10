import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider'
import { UsersRepository } from '../../repositories/implementations/UsersRepository'
import { UpdateUserController } from './UpdateUserController'
import { UpdateUserUseCase } from './UpdateUserUseCase'

const usersRepository = new UsersRepository()
const bcryptHashProvider = new BCryptHashProvider()

const updateUserUseCase = new UpdateUserUseCase(usersRepository, bcryptHashProvider)

const updateUserController = new UpdateUserController(updateUserUseCase)

export {
  updateUserController,
}
