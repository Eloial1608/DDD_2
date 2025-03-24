import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateLessonCommand implements Command {
  constructor (
        readonly id: string,
        readonly sectionId: string,
        readonly title: string,
        readonly type: string,
        readonly content: string
  ) {}
}
