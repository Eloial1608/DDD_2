import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateSpaceMemberCommand } from './CreateSpaceMemberCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { CommunityId } from '@Core/SpaceMember/domain/ValueObjects/CommunityId'
import { UserId } from '@Core/SpaceMember/domain/ValueObjects/UserId'
import { SpaceId } from '@Core/SpaceMember/domain/ValueObjects/SpaceId'
import { InvitedBy } from '@Core/SpaceMember/domain/ValueObjects/InvitedBy'
import { InvitedAt } from '@Core/SpaceMember/domain/ValueObjects/InvitedAt'
import { IsModerator } from '@Core/SpaceMember/domain/ValueObjects/IsModerator'

export class CreateSpaceMemberCommandHandler implements CommandHandler<CreateSpaceMemberCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateSpaceMemberCommand
  }

  async handle (command: CreateSpaceMemberCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new UserId(command.userId),
      new SpaceId(command.spaceId),
      new CommunityId(command.communityId),
      command.invitedBy ? new InvitedBy(command.invitedBy) : null,
      command.invitedAt ? new InvitedAt(command.invitedAt) : null,
      new IsModerator(command.isModerator)
    )
  }
}
