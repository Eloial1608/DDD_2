import { Tokenizer } from '@Auth/Shared/domain/Tokenizer/Tokenizer'
import { sign } from 'jsonwebtoken'
import { JwtTokenizerConfig } from './JwtTokenizerConfigFactory'

export class JwtTokenizer implements Tokenizer {
  constructor (private readonly config: JwtTokenizerConfig) {}

  async create (data: object, expiresIn: number): Promise<string> {
    return await sign(data, this.config.privateKey, {
      algorithm: 'ES512',
      expiresIn
    })
  }
}
