import { DomainError } from '../Errors/DomainError'
import { Command } from './Command'

export class CommandNotRegisteredError extends DomainError {
  protected code = 'command-not-registered'
  protected message

  constructor (q: Command) {
    super()
    this.message = `The command ${q.constructor.name} is not registered to any handler`
  }
}
