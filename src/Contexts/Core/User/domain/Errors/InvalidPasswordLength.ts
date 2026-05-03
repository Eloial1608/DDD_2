import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidPasswordLength extends DomainError {
  protected code = 'invalid-Password-length'
  protected message

  constructor (value: string) {
    super()
    this.message = `A user with Password ${value} isn't valid - it must have at least 9 chars`
  }
}