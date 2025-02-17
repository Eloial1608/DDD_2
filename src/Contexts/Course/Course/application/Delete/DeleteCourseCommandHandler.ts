import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteCourseCommand } from './DeleteCourseCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { CommunityId } from '@Course/Course/domain/ValueObjects/CommunityId'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'

export class DeleteCourseCommandHandler implements CommandHandler<DeleteCourseCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteCourseCommand
  }

  async handle (command: DeleteCourseCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId)
    )
  }
}
