import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidNameLength extends DomainError {
  protected code = 'invalid-name-length'
  protected message

  constructor (value: string) {
    super()
    this.message = `A user with name ${value} isn't valid - it must have at least 3 letters`
  }
}
