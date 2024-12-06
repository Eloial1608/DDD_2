import { verify } from 'jsonwebtoken'
import { JwtTokenDecoderConfig } from './JwtTokenDecoderConfigFactory'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'

export class JwtTokenDecoder implements TokenDecoder {
  constructor (private readonly config: JwtTokenDecoderConfig) {}

  run (token: string): object {
    const data = verify(token, this.config.publicKey, {
      algorithms: ['ES512']
    })

    if (typeof data === 'string') throw new CannotDecode('The token cannot be decoded')

    return data
  }
}
