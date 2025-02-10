import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateSectionCommand implements Command {
  constructor (
        readonly id: string,
        readonly courseId: string,
        readonly title: string
  ) {}
}
