import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InsufficientFunds extends DomainError {
  protected code = 'insufficient-funds'
  protected message

  constructor (availableBalance: number, requestedAmount: number) {
    super()
    this.message = `Insufficient funds: available ${availableBalance}, required ${requestedAmount}`
  }
}