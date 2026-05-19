import { verify } from 'jsonwebtoken'
import { JwtTokenDecoderConfig } from './JwtTokenDecoderConfigFactory'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { TokenData } from '@Shared/domain/TokenDecoder/TokenData'

export class JwtTokenDecoder implements TokenDecoder {
  constructor (private readonly config: JwtTokenDecoderConfig) {}

  async run (token: string): Promise<TokenData> {
    try {
      if (token.indexOf('Bearer') > -1) token = token.replace('Bearer ', '')

      const data = verify(token, this.config.secret, {
        algorithms: ['HS512']
      })

      if (typeof data === 'string') throw new CannotDecode('The token cannot be decoded')

      const tokenData = data as TokenData

      if (!tokenData.id) {
        throw new CannotDecode('Token payload missing required id field')
      }

      return tokenData
    } catch (e) {
      if (e instanceof CannotDecode) throw e
      console.error('JWT verification error:', e)
      throw new CannotDecode('The token cannot be decoded')
    }
  }
}
