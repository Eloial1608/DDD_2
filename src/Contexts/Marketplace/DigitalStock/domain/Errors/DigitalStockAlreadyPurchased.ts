import { DomainError } from '@Shared/domain/Errors/DomainError'
import type { Id } from '../ValueObjects/Id'

export class DigitalStockAlreadyPurchased extends DomainError {
  protected code = 'digital-stock-already-purchased'
  protected message: string

  constructor (id: Id) {
    super()
    this.message = `DigitalStock with id ${id} has already been purchased and cannot be deleted.`
  }
}
