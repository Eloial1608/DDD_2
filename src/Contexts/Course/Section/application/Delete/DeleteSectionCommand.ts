import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteSectionCommand implements Command {
  constructor (
        readonly id: string,
        readonly courseId: string
  ) {}
}
