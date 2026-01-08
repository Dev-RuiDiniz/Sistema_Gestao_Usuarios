import { PrismaLogsRepository } from '../../repositories/logs-repository.js'
import { CreateLogService } from '../create-log.js'

export function makeCreateLogService() {
  const logsRepository = new PrismaLogsRepository()
  const service = new CreateLogService(logsRepository)

  return service
}