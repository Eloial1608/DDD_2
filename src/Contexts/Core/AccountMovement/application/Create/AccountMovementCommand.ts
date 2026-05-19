import { AccountMovementTypeEnum } from '@Core/AccountMovement/domain/ValueObjects/AccountMovementType';
import { Command } from '@Shared/domain/CommandBus/Command'

export class AccountMovementCommand implements Command {
  constructor(
    readonly id: string,
    readonly transferId: string,
    readonly accountId: string,
    readonly amount: number,
    readonly type: AccountMovementTypeEnum,
    readonly description: string,
    readonly relatedAccountId?: string | null,
    readonly cardId?: string | null
  ) {}
}