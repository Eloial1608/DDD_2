import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidActionType extends DomainError {
  protected code = 'invalid-action-type'
  protected message

  constructor (feature: string) {
    super()
    this.message = `The action type ${feature} isn't valid`
  }
}
