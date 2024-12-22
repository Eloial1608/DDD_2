import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateCalendarCommand } from './UpdateCalendarCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Calendar/domain/ValueObjects/Id'
import { DateAt } from '@Core/Calendar/domain/ValueObjects/DateAt'
import { UserIds } from '@Core/Calendar/domain/ValueObjects/UserIds'
import { CommunityId } from '@Core/Calendar/domain/ValueObjects/CommunityId'
import { Content } from '@Core/Calendar/domain/ValueObjects/Content'
import { EntityId } from '@Core/Calendar/domain/ValueObjects/EntityId'
import { AllowedEntityTypes, EntityType } from '@Core/Calendar/domain/ValueObjects/EntityType'

export class UpdateCalendarCommandHandler implements CommandHandler<UpdateCalendarCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateCalendarCommand
  }

  async handle (command: UpdateCalendarCommand): Promise<void> {
    await this.updater.run({
      id: new Id(command.id),
      dateAt: new DateAt(command.dateAt),
      userIds: new UserIds(command.userIds),
      communityId: new CommunityId(command.communityId),
      content: new Content(command.content),
      entityId: command.entityId ? new EntityId(command.entityId) : null,
      entityType: command.entityType ? new EntityType(command.entityType as AllowedEntityTypes) : null
    })
  }
}
