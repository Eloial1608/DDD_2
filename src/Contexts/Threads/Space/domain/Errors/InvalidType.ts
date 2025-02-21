import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidType extends DomainError {
  protected code = 'invalid-allowed-type'
  protected message

  constructor (feature: string) {
    super()
    this.message = `The space type ${feature} isn't valid`
  }
}
