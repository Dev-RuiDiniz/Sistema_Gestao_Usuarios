import axios from 'axios';

export const api = axios.create({
  // URL do seu servidor Express (ajuste se estiver usando outra porta)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
});