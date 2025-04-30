import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateCourseUserWhenNoPriceCommand implements Command {
  constructor (
        readonly id: string,
        readonly userId: string,
        readonly courseId: string
  ) {}
}
