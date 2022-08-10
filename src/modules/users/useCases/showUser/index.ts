import { UsersRepository } from '../../repositories/implementations/UsersRepository'
import { ShowUserController } from './ShowUserController'
import { ShowUserUseCase } from './ShowUserUseCase'

const usersRepository = new UsersRepository()

const showUserUseCase = new ShowUserUseCase(usersRepository)

const showUserController = new ShowUserController(showUserUseCase)

export {
  showUserController,
}
