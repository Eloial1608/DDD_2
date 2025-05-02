import { Creator } from './Creator'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateCourseUserWhenNoPriceCommand } from './CreateCourseUserWhenNoPriceCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Course/CourseUser/domain/ValueObjects/Id'
import { UserId } from '@Course/CourseUser/domain/ValueObjects/UserId'
import { CourseId } from '@Course/CourseUser/domain/ValueObjects/CourseId'

export class CreateCourseUserWhenNoPriceCommandHandler implements CommandHandler<CreateCourseUserWhenNoPriceCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateCourseUserWhenNoPriceCommand
  }

  async handle (command: CreateCourseUserWhenNoPriceCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new UserId(command.userId),
      new CourseId(command.courseId)
    )
  }
}
