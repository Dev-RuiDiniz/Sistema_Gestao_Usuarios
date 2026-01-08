// src/services/errors/invalid-credentials-error.ts
export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}