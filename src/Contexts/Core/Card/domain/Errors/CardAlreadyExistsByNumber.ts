import { DomainError } from '@Shared/domain/Errors/DomainError'
import { NumCard } from '../ValueObjects/NumCard'

export class CardAlreadyExistsByNumber extends DomainError {
  protected code = 'card-already-exists-by-number'
  protected message

  constructor(numCard: NumCard) {
    super()
    this.message = `A Card with number ${numCard.valueOf()} already exists`
  }
}