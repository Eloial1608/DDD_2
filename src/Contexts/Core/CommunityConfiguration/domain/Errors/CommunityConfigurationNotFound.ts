import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class CommunityConfigurationNotFound extends DomainError {
  protected code = 'communityconfiguration-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A communityconfiguration with id ${id} wasn't found`
  }
}
