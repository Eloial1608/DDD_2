import { DomainError } from '../Errors/DomainError'

export class InvalidArgumentError extends DomainError {
  protected code = 'invalid-argument'

  constructor (protected message: string) {
    super()
  }
}
