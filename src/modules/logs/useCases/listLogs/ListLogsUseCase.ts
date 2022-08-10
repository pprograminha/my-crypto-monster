import { Log } from '@prisma/client';
import { ILogsRepository } from '../../repositories/ILogsRepositories';

type Response = {
  log: Log;
}[]

class ListLogsUseCase {
  constructor(
    private logsRepository: ILogsRepository,
  ) {}

  async execute(user_id?: string): Promise<Response> {
    let logs: Log[] = [];

    if(user_id) {
        logs = await this.logsRepository.listAllLogsFromUserId(user_id);
    } else {
        logs = await this.logsRepository.listAllLogs();
    }

    return logs.map(log => ({ log }))
  }
}

export { ListLogsUseCase };
