import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class ThemeNotFound extends DomainError {
  protected code = 'theme-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A theme with id ${id} wasn't found`
  }
}
