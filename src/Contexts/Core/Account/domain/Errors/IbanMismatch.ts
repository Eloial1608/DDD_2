import { DomainError } from '@Shared/domain/Errors/DomainError'

export class IbanMismatch extends DomainError {
  protected code = 'iban-mismatch'
  protected message

  constructor (expectedIban: string, providedIban: string) {
    super()
    this.message = `IBAN mismatch: expected ${expectedIban}, but got ${providedIban}`
  }
}
