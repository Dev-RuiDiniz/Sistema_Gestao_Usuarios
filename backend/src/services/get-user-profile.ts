import { type User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

// 1. Importamos a INTERFACE como tipo (para o constructor) 
// 2. Importamos a CLASSE como valor (para o new na Factory)
// Fazemos isso em uma única linha para evitar duplicidade
import { type UsersRepository, PrismaUsersRepository } from '../repositories/users-repository.js'

interface GetUserProfileServiceRequest {
  userId: string
}

interface GetUserProfileServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}

// Factory para o serviço
export function makeGetUserProfileService() {
  // Agora o TS sabe que PrismaUsersRepository é uma classe instanciável
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileService(usersRepository)

  return useCase
}