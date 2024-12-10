import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateSpaceMemberCommand implements Command {
  constructor (
    readonly id: string,
    readonly userId: string,
    readonly spaceId: string,
    readonly communityId: string,
    readonly isModerator: boolean,
    readonly invitedBy: Nullable<string>,
    readonly invitedAt: Nullable<Date>
  ) {}
}
