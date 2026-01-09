FROM node:22-slim AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

EXPOSE 3333

# Usando o formato JSON (Exec Form) chamando o shell explicitamente 
# para suportar o operador '&&' com segurança
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]