import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateContentCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly type: string,
        readonly url: string
  ) {}
}
