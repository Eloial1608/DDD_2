import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteCommunityConfigurationCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
