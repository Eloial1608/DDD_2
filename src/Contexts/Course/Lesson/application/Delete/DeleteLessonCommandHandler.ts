import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { DeleteLessonCommand } from './DeleteLessonCommand'
import { SectionId } from '@Course/Lesson/domain/ValueObjects/SectionId'

export class DeleteLessonCommandHandler implements CommandHandler<DeleteLessonCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteLessonCommand
  }

  async handle (command: DeleteLessonCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new SectionId(command.sectionId)
    )
  }
}
