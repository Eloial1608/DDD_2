import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreatePlanForUsersCommand implements Command {
  constructor (
    readonly id: string,
    readonly name: string,
    readonly description: Nullable<string>,
    readonly communityId: string,
    readonly priceValue: number,
    readonly priceCurrency: string,
    readonly renovationInterval: number,
    readonly renovationType: string
  ) {}
}
