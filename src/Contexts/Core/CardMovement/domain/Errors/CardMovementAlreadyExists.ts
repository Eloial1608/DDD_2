import { DomainError } from '@Shared/domain/Errors/DomainError'
import { CardMovementId } from '../ValueObjects/CardMovementId'

export class CardMovementAlreadyExists extends DomainError {
  protected code = 'card-movement-already-exists'
  protected message

  constructor (id: CardMovementId) {
    super()
    this.message = `A card movement with id ${id} already exists`
  }
}
