import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { CourseId } from '@Course/Section/domain/ValueObjects/CourseId'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { DeleteSectionCommand } from './DeleteSectionCommand'

export class DeleteSectionCommandHandler implements CommandHandler<DeleteSectionCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteSectionCommand
  }

  async handle (command: DeleteSectionCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CourseId(command.courseId)
    )
  }
}
