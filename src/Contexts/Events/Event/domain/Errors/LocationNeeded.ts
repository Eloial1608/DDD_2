import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class LocationNeeded extends DomainError {
  protected code = 'location-needed'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A event with id ${id} can't be created: Location is needed if the event is online`
  }
}
