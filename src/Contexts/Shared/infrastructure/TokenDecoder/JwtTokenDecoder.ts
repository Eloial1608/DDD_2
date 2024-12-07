import { verify } from 'jsonwebtoken'
import { JwtTokenDecoderConfig } from './JwtTokenDecoderConfigFactory'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { TokenData } from '@Shared/domain/TokenDecoder/TokenData'

export class JwtTokenDecoder implements TokenDecoder {
  constructor (private readonly config: JwtTokenDecoderConfig) {}

  run (token: string): TokenData {
    try {
      if (token.indexOf('Bearer') > -1) token.replace('Bearer ', '')

      const data = verify(token, this.config.publicKey, {
        algorithms: ['ES512']
      })

      if (typeof data === 'string') throw new CannotDecode('The token cannot be decoded')

      return data as TokenData
    } catch (e) {
      console.log(e)
      throw new CannotDecode('The token cannot be decoded')
    }
  }
}
