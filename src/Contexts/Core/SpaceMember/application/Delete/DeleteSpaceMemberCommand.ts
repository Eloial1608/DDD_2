import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteSpaceMemberCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
