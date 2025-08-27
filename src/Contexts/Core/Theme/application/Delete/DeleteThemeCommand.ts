import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteThemeCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
