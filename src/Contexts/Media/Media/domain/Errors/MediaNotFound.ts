import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class MediaNotFound extends DomainError {
  protected code = 'media-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A media with id ${id} wasn't found`
  }
}
