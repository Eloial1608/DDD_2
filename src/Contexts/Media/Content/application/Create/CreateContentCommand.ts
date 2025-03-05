import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateContentCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly mediaId: string,
        readonly type: string,
        readonly url: string
  ) {}
}
