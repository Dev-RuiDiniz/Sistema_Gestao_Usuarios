export {}

declare global {
  namespace Express {
    export interface Request {
      user: {
        sub: string             // Mudamos 'id' para 'sub'
        role: 'ADMIN' | 'USER'  // Mudamos 'MEMBER' para 'USER'
      }
    }
  }
}