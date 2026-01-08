import { Prisma, type Log } from '@prisma/client'
import { prisma } from '../lib/prisma.js'

export interface LogsRepository {
  create(data: Prisma.LogUncheckedCreateInput): Promise<Log>
}

export class PrismaLogsRepository implements LogsRepository {
  async create(data: Prisma.LogUncheckedCreateInput) {
    const log = await prisma.log.create({
      data,
    })

    return log
  }
}