import { FirebaseConfig } from './ClientFactory'
export const config = {
  credentials: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  }
}

export class ConfigFactory {
  static create (): FirebaseConfig {
    return config as FirebaseConfig
  }
}
