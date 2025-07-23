import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidExceptionTypeError extends DomainError {
  protected code = 'invalid-exception-type'
  protected message: string

  constructor (value: string) {
    super()
    this.message = `Invalid ExceptionType: ${value}`
  }
}
