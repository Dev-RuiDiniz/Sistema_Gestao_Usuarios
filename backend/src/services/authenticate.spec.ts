import { it, describe, expect, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate.js'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService // System Under Test

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('deve ser possível autenticar com credenciais válidas', async () => {
    // Criando um usuário no banco em memória
    await usersRepository.create({
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password_hash: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('não deve ser possível autenticar com e-mail inexistente', async () => {
    await expect(() =>
      sut.execute({
        email: 'nonexistent@example.com',
        password_hash: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('não deve ser possível autenticar com senha incorreta', async () => {
    await usersRepository.create({
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password_hash: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})