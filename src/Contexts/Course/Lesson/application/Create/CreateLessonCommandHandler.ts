import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { CreateLessonCommand } from './CreateLessonCommand'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { SectionId } from '@Course/Lesson/domain/ValueObjects/SectionId'
import { Title } from '@Course/Lesson/domain/ValueObjects/Title'
import { Content } from '@Course/Lesson/domain/ValueObjects/Content'

export class CreateLessonCommandHandler implements CommandHandler<CreateLessonCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateLessonCommand
  }

  async handle (command: CreateLessonCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new SectionId(command.sectionId),
      new Title(command.title),
      new Content(command.content)
    )
  }
}
