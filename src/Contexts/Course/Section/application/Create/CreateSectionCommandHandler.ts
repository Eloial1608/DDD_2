import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateSectionCommand } from './CreateSectionCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { CourseId } from '@Course/Section/domain/ValueObjects/CourseId'
import { Title } from '@Course/Section/domain/ValueObjects/Title'
import { Description } from '@Course/Section/domain/ValueObjects/Description'

export class CreateSectionCommandHandler implements CommandHandler<CreateSectionCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateSectionCommand
  }

  async handle (command: CreateSectionCommand):Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CourseId(command.courseId),
      new Title(command.title),
      command.description ? new Description(command.description) : null
    )
  }
}
