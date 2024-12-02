import { Encrypter } from '@Auth/Shared/domain/Encrypt/Encrypter'
import { HMacEncrypterConfig } from './HMacEncrypterConfigFactory'
import { createHmac } from 'crypto'

export class HMacEncrypter implements Encrypter {
  constructor (private readonly config: HMacEncrypterConfig) {}

  encrypt (v: string): string {
    const generator = createHmac('sha512', this.config.salt)
    return generator.update(v).digest('hex')
  }
}
