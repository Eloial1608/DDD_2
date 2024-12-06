import { App, AppOptions, initializeApp } from 'firebase-admin/app'
import { Auth, getAuth } from 'firebase-admin/auth'
import { ServiceAccount, credential } from 'firebase-admin'

export interface FirebaseConfig {
    credentials: ServiceAccount;
}

export interface FirebaseConfigResponse {
  (): Auth
}

export class ClientFactory {
  private static app: App | null = null

  static async create (config: FirebaseConfig): Promise<FirebaseConfigResponse> {
    const serviceAccount = config.credentials

    serviceAccount.privateKey = serviceAccount.privateKey?.replace(/\\n/g, '\n')

    return () => {
      if (!this.app) {
        this.app = initializeApp(this.prepareConfig(config))
      }

      return getAuth(this.app)
    }
  }

  private static prepareConfig (config: FirebaseConfig): AppOptions {
    return config.credentials.privateKey
      ? {
          credential: credential.cert(config.credentials),
          projectId: config.credentials.projectId
        }
      : {
          projectId: config.credentials.projectId
        }
  }
}
