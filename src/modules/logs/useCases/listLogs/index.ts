import { ListLogsController } from './ListLogsController'
import { ListLogsUseCase } from './ListLogsUseCase'
import { LogsRepository } from '../../repositories/implementations/LogsRepositories'

const logsRepository = new LogsRepository()

const listLogsUseCase = new ListLogsUseCase(logsRepository)

const listLogsController = new ListLogsController(listLogsUseCase)

export {
  listLogsController,
  listLogsUseCase,
}