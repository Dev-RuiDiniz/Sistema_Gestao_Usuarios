// src/services/authenticate.spec.ts
import { it, describe, expect, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate.js'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'rui@exemplo.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'rui@exemplo.com',
      password_hash: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      email: 'rui@exemplo.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'rui@exemplo.com',
        password_hash: 'senha-errada',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})