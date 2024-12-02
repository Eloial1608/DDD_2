import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateAuthUserCommand implements Command {
  constructor (
        readonly id: string,
        readonly email: string,
        readonly method: string,
        readonly secret: string,
        readonly userId: string,
        readonly communityId: string
  ) {}
}
