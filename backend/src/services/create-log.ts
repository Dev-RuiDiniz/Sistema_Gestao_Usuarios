import { LogsRepository } from '../repositories/logs-repository.js'

interface CreateLogServiceRequest {
  userId: string
  action: 'USER_DELETED' | 'ROLE_UPDATED' | 'USER_AUTHENTICATED' | 'LOGOUT'
  details?: string
}

export class CreateLogService {
  constructor(private logsRepository: LogsRepository) {}

  async execute({ userId, action, details }: CreateLogServiceRequest): Promise<void> {
    await this.logsRepository.create({
      userId,
      action,
      details,
    })
  }
}