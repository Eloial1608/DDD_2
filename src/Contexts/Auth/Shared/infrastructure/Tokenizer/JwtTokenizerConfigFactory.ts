export type JwtTokenizerConfig = {
    privateKey: string
}

export class JwtTokenizerConfigFactory {
  static create (): JwtTokenizerConfig {
    return {
      privateKey: process.env.JWT_PRIVATE_KEY!
    }
  }
}
