import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdateLessonCommand } from './UpdateLessonCommand'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { SectionId } from '@Course/Lesson/domain/ValueObjects/SectionId'
import { Title } from '@Course/Lesson/domain/ValueObjects/Title'
import { Type } from '@Course/Lesson/domain/ValueObjects/Type'
import { Content } from '@Course/Lesson/domain/ValueObjects/Content'
import { AllowedTypes } from '@Course/Lesson/domain/ValueObjects/AllowedTypes'

export class UpdateLessonCommandHandler implements CommandHandler<UpdateLessonCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateLessonCommand
  }

  async handle (command: UpdateLessonCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new SectionId(command.sectionId),
      new Title(command.title),
      new Type(command.type as AllowedTypes),
      new Content(command.content)
    )
  }
}
