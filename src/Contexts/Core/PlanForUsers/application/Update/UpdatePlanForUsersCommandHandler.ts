import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdatePlanForUsersCommand } from './UpdatePlanForUsersCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Updater } from '@Core/PlanForUsers/application/Update/Updater'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { Name } from '@Core/PlanForUsers/domain/ValueObjects/Name'
import { Description } from '@Core/PlanForUsers/domain/ValueObjects/Description'
import { CommunityId } from '@Core/PlanForUsers/domain/ValueObjects/CommunityId'
import { Price } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/PlanForUsers/domain/ValueObjects/RenovatioInterval'
import { MoneyValueObjectCurrency, MoneyValueObjectValue } from '@Shared/domain/ValueObjects/MoneyValueObject'
import { RenovationType } from '@Core/PlanForUsers/domain/ValueObjects/RenovationType'
import { RenovationTypeValues } from '@Shared/domain/SharedValueObjects/SharedRenovationType'

export class UpdatePlanForUsersCommandHandler implements CommandHandler<UpdatePlanForUsersCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdatePlanForUsersCommand
  }

  async handle (command: UpdatePlanForUsersCommand): Promise<void> {
    await this.updater.run(
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
