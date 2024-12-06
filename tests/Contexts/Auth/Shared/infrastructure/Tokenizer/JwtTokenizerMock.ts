import { Tokenizer } from '@Auth/Shared/domain/Tokenizer/Tokenizer'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class JwtTokenizerMock implements Tokenizer {
  private readonly tokenizer = mockFn()

  async create (data: object, expiresIn: number): Promise<string> {
    this.tokenizer(data, expiresIn)
    return 'token'
  }

  assertTokenizerHasBeenCalledWith (data: object, expiresIn: number) {
    expect(this.tokenizer).toHaveBeenCalledWith(data, expiresIn)
  }
}
