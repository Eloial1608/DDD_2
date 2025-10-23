import { DomainError } from '@Shared/domain/Errors/DomainError'
import type { Id } from '../ValueObjects/Id'

export class DigitalStockNotFound extends DomainError {
  protected code = 'digital-stock-not-found'
  protected message: string

  constructor (id: Id) {
    super()
    this.message = `A digital stock with id ${id} wasn't found`
  }
}
