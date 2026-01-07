// src/services/register.spec.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterService } from './register.js';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository.js';
import { compareHash } from '../utils/hash-password.js';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterService; // System Under Test

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password_hash: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password_hash: '123456',
    });

    const isPasswordCorrectlyHashed = await compareHash('123456', user.password_hash);
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com';

    await sut.execute({ email, password_hash: '123456' });

    await expect(() =>
      sut.execute({ email, password_hash: '123456' }),
    ).rejects.toBeInstanceOf(Error);
  });
});