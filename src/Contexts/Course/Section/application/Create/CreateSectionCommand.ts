import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateSectionCommand implements Command {
  constructor (
        readonly id: string,
        readonly courseId: string,
        readonly title: string,
        readonly description: Nullable<string>
  ) {}
}
