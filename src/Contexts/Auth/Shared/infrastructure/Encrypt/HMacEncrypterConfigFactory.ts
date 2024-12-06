export type HMacEncrypterConfig = {
    salt: string
}

export class HMacEncrypterConfigFactory {
  static create (): HMacEncrypterConfig {
    return {
      salt: process.env.AUTH_SALT!
    }
  }
}
