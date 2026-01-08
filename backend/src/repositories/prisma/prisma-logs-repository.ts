import { prisma } from '@/lib/prisma.js'
import { Prisma, Log } from '@prisma/client'
import { LogsRepository } from '../logs-repository.js'

export class PrismaLogsRepository implements LogsRepository {
  async create(data: Prisma.LogUncheckedCreateInput): Promise<Log> {
    const log = await prisma.log.create({
      data,
    })
    return log
  }

  async findMany(): Promise<Log[]> {
    const logs = await prisma.log.findMany({
      orderBy: {
        // CORREÇÃO: O campo no seu schema chama-se 'timestamp'
        timestamp: 'desc', 
      },
    })
    return logs
  }
}