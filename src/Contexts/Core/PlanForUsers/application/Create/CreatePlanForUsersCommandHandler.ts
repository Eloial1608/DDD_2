import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreatePlanForUsersCommand } from './CreatePlanForUsersCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from '@Core/PlanForUsers/application/Create/Creator'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { Name } from '@Core/PlanForUsers/domain/ValueObjects/Name'
import { Description } from '@Core/PlanForUsers/domain/ValueObjects/Description'
import { CommunityId } from '@Core/PlanForUsers/domain/ValueObjects/CommunityId'
import { Price } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/PlanForUsers/domain/ValueObjects/RenovatioInterval'
import { MoneyValueObjectCurrency, MoneyValueObjectValue } from '@Shared/domain/ValueObjects/MoneyValueObject'
import { RenovationType } from '@Core/PlanForUsers/domain/ValueObjects/RenovationType'
import { RenovationTypeValues } from '@Shared/domain/SharedValueObjects/SharedRenovationType'

export class CreatePlanForUsersCommandHandler implements CommandHandler<CreatePlanForUsersCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreatePlanForUsersCommand
  }

  async handle (command: CreatePlanForUsersCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new Name(command.name),
      command.description == null ? command.description : new Description(command.description),
      new CommunityId(command.communityId),
      new Price(
        new MoneyValueObjectValue(command.priceValue),
        new MoneyValueObjectCurrency(command.priceCurrency)
      ),
      new RenovationInterval(command.renovationInterval),
      new RenovationType(command.renovationType as RenovationTypeValues)
    )
  }
}
