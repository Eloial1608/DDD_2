import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class SectionNotFound extends DomainError {
  protected code = 'section-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A Section with id ${id} wasn't found`
  }
}
