import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidDigitalStockType extends DomainError {
  protected code = 'invalid-digital-stock-type'
  protected message

  constructor (feature: string) {
    super()
    this.message = `The digital stock type ${feature} isn't valid`
  }
}
