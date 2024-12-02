import { Encrypter } from '@Auth/Shared/domain/Encrypt/Encrypter'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class EncrypterMock implements Encrypter {
  private mockEncrypt = mockFn()

  private expectedEncrypt: string = ''

  encrypt (v: string): string {
    this.mockEncrypt(v)
    return this.expectedEncrypt
  }

  returnOnEncrypt (v: string): void {
    this.expectedEncrypt = v
  }

  assertEncryptHasBeenCalledWith (v: string) {
    expect(this.mockEncrypt).toHaveBeenCalledWith(v)
  }
}
