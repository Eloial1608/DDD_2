import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateCommentCommand } from './CreateCommentCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Course/Comment/domain/ValueObjects/Id'
import { CourseId } from '@Course/Comment/domain/ValueObjects/CourseId'
import { UserId } from '@Course/Comment/domain/ValueObjects/UserId'
import { Content } from '@Course/Comment/domain/ValueObjects/Content'

export class CreateCommentCommandHandler implements CommandHandler <CreateCommentCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateCommentCommand
  }

  async handle (command: CreateCommentCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CourseId(command.courseId),
      new UserId(command.userId),
      new Content(command.content)
    )
  }
}
