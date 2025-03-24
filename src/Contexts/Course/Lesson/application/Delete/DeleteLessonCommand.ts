import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteLessonCommand implements Command {
  constructor (
        readonly id: string,
        readonly sectionId: string
  ) {}
}
