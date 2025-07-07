import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class ProjectNotFound extends DomainError {
  protected code = 'project-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A project with id ${id} wasn't found`
  }
}
