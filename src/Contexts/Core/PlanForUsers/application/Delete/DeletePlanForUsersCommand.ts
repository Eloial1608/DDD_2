import { Command } from '@Shared/domain/CommandBus/Command'

export class DeletePlanForUsersCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
