// src/server.ts
import { app } from './app.js';

app.listen(3333, () => {
  console.log('🚀 HTTP Server Running on http://localhost:3333');
});