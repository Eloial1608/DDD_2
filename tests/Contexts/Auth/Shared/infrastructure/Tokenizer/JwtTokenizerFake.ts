import { Tokenizer } from '@Auth/Shared/domain/Tokenizer/Tokenizer'

export class JwtTokenizerFake implements Tokenizer {
  async create (data: object, expiresIn: number): Promise<string> {
    return 'token'
  }
}
