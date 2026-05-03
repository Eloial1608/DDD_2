import { DomainError } from '@Shared/domain/Errors/DomainError'

export class CannotDecode extends DomainError {
  protected code = 'cannot-decode-token'

  constructor (protected message: string) {
    super()
  }
}
