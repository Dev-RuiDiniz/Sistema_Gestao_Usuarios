import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { type UsersRepository, PrismaUsersRepository } from '../repositories/users-repository.js'

interface DeleteUserServiceRequest {
  userId: string
}

export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.delete(userId)
  }
}

// Factory
export function makeDeleteUserService() {
  const usersRepository = new PrismaUsersRepository()
  return new DeleteUserService(usersRepository)
}