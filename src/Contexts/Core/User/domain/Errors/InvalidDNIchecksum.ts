import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidDNIchecksum extends DomainError {
  protected code = 'invalid-DNI-checksum'
  protected message

  constructor (value: string) {
    super()
    this.message = `A user with DNi ${value} isn't valid checksum`
  }
}