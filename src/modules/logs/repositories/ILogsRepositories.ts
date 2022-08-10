import { Log } from '@prisma/client';

type CreateLogDTO = {
  user_id: string;
  content: string;
}

interface ILogsRepository {
  create(data: CreateLogDTO): Promise<Log>;
  listAllLogs(): Promise<Log[]>;
  listAllLogsFromUserId(user_id: string): Promise<Log[]>;
}
export { ILogsRepository, CreateLogDTO };
