import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateLessonOrderCommand implements Command {
  constructor (
        readonly id: string,
        readonly order: number
  ) {}
}
