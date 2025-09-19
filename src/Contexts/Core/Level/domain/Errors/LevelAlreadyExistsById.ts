import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class LevelAlreadyExistsById extends DomainError {
  protected code = 'level-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A level with id ${id} already exists`
  }
}
