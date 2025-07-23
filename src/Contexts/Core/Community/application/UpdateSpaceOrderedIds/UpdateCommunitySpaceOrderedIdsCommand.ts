import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateCommunitySpaceOrderedIdsCommand implements Command {
  constructor (
        readonly id: string,
        readonly spaceOrderedIds: string
  ) {}
}
