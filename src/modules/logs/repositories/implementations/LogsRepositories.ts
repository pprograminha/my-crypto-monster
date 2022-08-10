import { Log } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../../shared/prisma/client';
import { CreateLogDTO, ILogsRepository } from '../ILogsRepositories';

class LogsRepository implements ILogsRepository {
  async create(data: CreateLogDTO): Promise<Log> {
    const log = await prisma.log.create({
      data: {
        id: uuid(),
        ...data
      },
    });

    return log 
  }
  
  async listAllLogs(): Promise<Log[]> {
    const logs = await prisma.log.findMany();

    return logs 
  }

  async listAllLogsFromUserId(user_id: string): Promise<Log[]> {
    const logs = await prisma.log.findMany({
        where: {
            user_id
        }
    });

    return logs 
  }
}

export { LogsRepository };
