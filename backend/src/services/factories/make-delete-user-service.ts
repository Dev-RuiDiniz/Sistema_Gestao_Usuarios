import { PrismaUsersRepository } from '../../repositories/users-repository.js'
import { PrismaLogsRepository } from '../../repositories/logs-repository.js'
import { DeleteUserService } from '../delete-user.js'

export function makeDeleteUserService() {
  const usersRepository = new PrismaUsersRepository()
  const logsRepository = new PrismaLogsRepository()
  return new DeleteUserService(usersRepository, logsRepository)
}