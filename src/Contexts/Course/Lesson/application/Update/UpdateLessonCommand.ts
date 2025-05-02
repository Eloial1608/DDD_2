import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateLessonCommand implements Command {
  constructor (
        readonly id: string,
        readonly sectionId: string,
        readonly title: string,
        readonly content: string
  ) {}
}
