export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // App
      PORT: string
      ENVIRONMENT: string
      JWT_SECRET: string
      PASS_SECRET: string

      // MONGODB
      MONGODB_USERNAME: string
      MONGODB_PASSWORD: string
      MONGODB_DATABASE: string
      MONGODB_HOST: string
      MONGODB_PORT: string
      MONGODB_DEBUG: string
    }
  }
}
