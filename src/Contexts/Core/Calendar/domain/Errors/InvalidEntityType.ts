import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidEntityType extends DomainError {
  protected code: string = 'invalid-entity-type'
  protected readonly message: string

  constructor (entityType: string) {
    super()
    this.message = `Invalid entity type ${entityType}`
  }
}
