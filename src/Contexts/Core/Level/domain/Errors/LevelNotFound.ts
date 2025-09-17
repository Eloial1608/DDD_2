import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class LevelNotFound extends DomainError {
  protected code = 'level-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A level with id ${id} wasn't found`
  }
}
