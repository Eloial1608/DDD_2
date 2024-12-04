export type JwtTokenDecoderConfig = {
    publicKey: string
}

export class JwtTokenDecoderConfigFactory {
  static create (): JwtTokenDecoderConfig {
    return {
      publicKey: process.env.JWT_PUBLIC_KEY!
    }
  }
}
