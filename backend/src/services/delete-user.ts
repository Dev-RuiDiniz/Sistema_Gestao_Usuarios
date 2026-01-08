import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { type UsersRepository } from '../repositories/users-repository.js'
import { type LogsRepository } from '../repositories/logs-repository.js'

interface DeleteUserServiceRequest {
  userId: string      // Usuário que será deletado
  adminId: string     // Administrador que está deletando (para o log)
}

export class DeleteUserService {
  constructor(
    private usersRepository: UsersRepository,
    private logsRepository: LogsRepository // Injeção do repositório de logs
  ) {}

  async execute({ userId, adminId }: DeleteUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.delete(userId)

    // Registro da Auditoria
    await this.logsRepository.create({
      userId: adminId,
      action: 'USER_DELETED',
      details: `Removeu permanentemente o usuário: ${user.email} (ID: ${userId})`,
    })
  }
}