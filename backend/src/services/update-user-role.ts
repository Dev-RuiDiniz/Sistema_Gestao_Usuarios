import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { type UsersRepository } from '../repositories/users-repository.js'
import { type LogsRepository } from '../repositories/logs-repository.js'
import { Role } from '@prisma/client'

interface UpdateUserRoleRequest {
  userId: string
  adminId: string
  role: Role
}

export class UpdateUserRoleService {
  constructor(
    private usersRepository: UsersRepository,
    private logsRepository: LogsRepository
  ) {}

  async execute({ userId, adminId, role }: UpdateUserRoleRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const oldRole = user.role
    const updatedUser = await this.usersRepository.updateRole(userId, role)

    // Registro da Auditoria
    await this.logsRepository.create({
      userId: adminId,
      action: 'ROLE_UPDATED',
      details: `Alterou cargo de ${user.email} de ${oldRole} para ${role}`,
    })

    return { user: updatedUser }
  }
}