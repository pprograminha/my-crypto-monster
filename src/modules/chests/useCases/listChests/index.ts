import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository'
import { ChestsRepository } from '../../repositories/implementations/ChestsRepository'
import { ListChestsController } from './ListChestsController'
import { ListChestsUseCase } from './ListChestsUseCase'

const chestsRepository = new ChestsRepository()
const usersRepository = new UsersRepository()

const listChestsUseCase = new ListChestsUseCase(chestsRepository, usersRepository)

const listChestsController = new ListChestsController(listChestsUseCase)

export {
    listChestsController,
}
