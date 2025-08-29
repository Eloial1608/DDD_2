import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Name } from '../ValueObjects/Name'

export class TitleAlreadyExistsByName extends DomainError {
  protected code = 'title-already-exists'
  protected message

  constructor (name: Name) {
    super()
    this.message = `A title with name ${name.valueOf()} already exists`
  }
}
