import { Log, Prisma } from '@prisma/client'
import { LogsRepository } from '../logs-repository.js'
import { randomUUID } from 'node:crypto'

export class InMemoryLogsRepository implements LogsRepository {
  public items: Log[] = []

  async create(data: Prisma.LogUncheckedCreateInput) {
    const log: Log = {
      id: randomUUID(),
      action: data.action,
      details: data.details || null,
      userId: data.userId,
      timestamp: new Date(),
    }

    this.items.push(log)
    return log
  }
}