import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    // Define onde o Vitest deve procurar os arquivos de teste
    include: ['src/**/*.{test,spec}.ts'],
  },
})