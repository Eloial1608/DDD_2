import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeletePlanForUsersCommand } from './DeletePlanForUsersCommand'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { CommunityId } from '@Core/PlanForUsers/domain/ValueObjects/CommunityId'

export class DeletePlanForUsersCommandHandler implements CommandHandler<DeletePlanForUsersCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeletePlanForUsersCommand
  }

  async handle (command: DeletePlanForUsersCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id),
      new CommunityId(command.communityId)
    )
  }
}
