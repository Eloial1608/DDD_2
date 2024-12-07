import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateUserCommand implements Command {
  constructor (
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly communityId: string,
        readonly isAdmin: boolean,
        readonly isOwner: boolean
  ) {}
}
