import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdateSectionCommand } from './UpdateSectionCommand'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { CourseId } from '@Course/Section/domain/ValueObjects/CourseId'
import { Title } from '@Course/Section/domain/ValueObjects/Title'

export class UpdateSectionCommandHandler implements CommandHandler<UpdateSectionCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateSectionCommand
  }

  async handle (command: UpdateSectionCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CourseId(command.courseId),
      new Title(command.title)
    )
  }
}
