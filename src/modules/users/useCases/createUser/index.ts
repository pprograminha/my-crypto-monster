import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'
import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider'
import { UsersRepository } from '../../repositories/implementations/UsersRepository'
import { JWTokenProvider } from '../../../../shared/providers/implementations/JWTokenProvider'

const bcryptHashProvider = new BCryptHashProvider()
const jwtokenProvider = new JWTokenProvider()
const usersRepository = new UsersRepository()

const createUserUseCase = new CreateUserUseCase(usersRepository, bcryptHashProvider, jwtokenProvider)

const createUserController = new CreateUserController(createUserUseCase)

export {
  createUserController,
  createUserUseCase,
}