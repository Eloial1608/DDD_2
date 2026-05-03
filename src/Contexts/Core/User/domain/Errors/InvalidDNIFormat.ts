import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidDNIFormat extends DomainError {
  protected code = 'invalid-name-length'
  protected message

  constructor (value: string) {
    super()
    this.message = `A user with DNi ${value} isn't valid format`
  }
}
