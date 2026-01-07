// src/utils/hash-password.ts
import { hash, compare } from 'bcryptjs';

export async function generateHash(payload: string): Promise<string> {
  // 6 rounds de salt é um bom equilíbrio entre segurança e performance para SaaS
  return hash(payload, 6);
}

export async function compareHash(payload: string, hashed: string): Promise<boolean> {
  return compare(payload, hashed);
}