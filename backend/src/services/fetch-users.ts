import { type User } from '@prisma/client'
// Importamos TUDO (interface e classe) do arquivo unificado que você editou
import { type UsersRepository, PrismaUsersRepository } from '../repositories/users-repository.js'

interface FetchUsersServiceRequest {
  page: number
}

interface FetchUsersServiceResponse {
  users: User[]
}

export class FetchUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
  }: FetchUsersServiceRequest): Promise<FetchUsersServiceResponse> {
    // Agora o TS reconhecerá que o método existe no repositório
    const users = await this.usersRepository.findManyPaginated(page)

    return { users }
  }
}

// Factory
export function makeFetchUsersService() {
  // Certifique-se de que esta classe está vindo do '../repositories/users-repository.js'
  const usersRepository = new PrismaUsersRepository()
  const useCase = new FetchUsersService(usersRepository)

  return useCase
}