export type JwtTokenDecoderConfig = {
    secret: string
}

export class JwtTokenDecoderConfigFactory {
  static create (): JwtTokenDecoderConfig {
    return {
      secret: process.env.JWT_SECRET!
    }
  }
}
