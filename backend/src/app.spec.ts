// src/app.spec.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './app.js';
import { prisma } from './lib/prisma.js';

describe('Integrity & Database Connection', () => {
  it('should be able to reach the health check route', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });

  it('should be able to connect to the database', async () => {
    // Tenta uma operação simples de contagem no banco
    const count = await prisma.user.count();
    
    expect(typeof count).toBe('number');
  });
});