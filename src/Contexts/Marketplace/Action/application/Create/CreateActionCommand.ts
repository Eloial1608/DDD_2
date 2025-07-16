import type { AvailableActionType } from '@Marketplace/Action/domain/ValueObjects/ActionType'
import type { Command } from '@Shared/domain/CommandBus/Command'
import type { Nullable } from '@Shared/domain/Nullable'

export class CreateActionCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly productId: string,
        readonly type: AvailableActionType,
        readonly targetId: Nullable<string>
  ) {}
}
