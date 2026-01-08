import { PrismaUsersRepository } from '../../repositories/users-repository.js'
import { PrismaLogsRepository } from '../../repositories/logs-repository.js'
import { UpdateUserRoleService } from '../update-user-role.js'

export function makeUpdateUserRoleService() {
  const usersRepository = new PrismaUsersRepository()
  const logsRepository = new PrismaLogsRepository()
  return new UpdateUserRoleService(usersRepository, logsRepository)
}