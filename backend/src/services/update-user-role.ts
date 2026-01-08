import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { type UsersRepository, PrismaUsersRepository } from '../repositories/users-repository.js'
import { type User, type Role } from '@prisma/client'

interface UpdateUserRoleServiceRequest {
  userId: string
  role: Role
}

interface UpdateUserRoleServiceResponse {
  user: User
}

export class UpdateUserRoleService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    role,
  }: UpdateUserRoleServiceRequest): Promise<UpdateUserRoleServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // Atualizamos o usuário através do repositório
    const updatedUser = await this.usersRepository.updateRole(userId, role)

    return { user: updatedUser }
  }
}

// Factory
export function makeUpdateUserRoleService() {
  const usersRepository = new PrismaUsersRepository()
  return new UpdateUserRoleService(usersRepository)
}