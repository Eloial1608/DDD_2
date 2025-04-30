import { ValidateEventUserCommand } from '@Events/EventUser/application/Validate/ValidateEventUserCommand'
import { EventUser } from '@Events/EventUser/domain/EventUser'

export class ValidateEventUserCommandMother {
  static validate (
    id: string
  ): ValidateEventUserCommand {
    return new ValidateEventUserCommand(
      id
    )
  }

  static fromAggregate (eventuser: EventUser): ValidateEventUserCommand {
    return this.validate(
      eventuser.id.valueOf()
    )
  }
}
