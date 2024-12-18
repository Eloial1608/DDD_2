import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateSpaceMemberModeratorCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly isModerator: boolean
  ) {}
}
