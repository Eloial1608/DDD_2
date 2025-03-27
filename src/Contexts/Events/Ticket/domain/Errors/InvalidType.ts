import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidType extends DomainError {
  protected code = 'invalid-type'
  protected message

  constructor (type: string) {
    super()
    this.message = `The type ${type} is invalid for an event of the selected accessibilit `
  }
}
