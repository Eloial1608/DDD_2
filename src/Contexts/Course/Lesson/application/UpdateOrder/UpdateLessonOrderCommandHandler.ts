import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdateLessonOrderCommand } from './UpdateLessonOrderCommand'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { Order } from '@Course/Lesson/domain/ValueObjects/Order'

export class UpdateLessonOrderCommandHandler implements CommandHandler<UpdateLessonOrderCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateLessonOrderCommand
  }

  async handle (command: UpdateLessonOrderCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Order(command.order)
    )
  }
}
