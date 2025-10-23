import { Command } from '@Shared/domain/CommandBus/Command'

export class CreatePageViewCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly userId: string,
        readonly spaceId: string
  ) {}
}
