import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateSpaceCommand } from './UpdateSpaceCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { Name } from '@Core/Space/domain/ValueObjects/Name'
import { Slug } from '@Core/Space/domain/ValueObjects/Slug'
import { ParentId } from '@Core/Space/domain/ValueObjects/ParentId'
import { Icon } from '@Core/Space/domain/ValueObjects/Icon'
import { HeaderUrl } from '@Core/Space/domain/ValueObjects/HeaderUrl'
import { Accessibility, AllowedAccessibilities } from '@Core/Space/domain/ValueObjects/Accessibility'
import { Price, PriceCurrency, PriceValue } from '@Core/Space/domain/ValueObjects/Price'
import { CommunityId } from '@Core/Space/domain/ValueObjects/CommunityId'

export class UpdateSpaceCommandHandler implements CommandHandler<UpdateSpaceCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateSpaceCommand
  }

  async handle (command: UpdateSpaceCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Name(command.name),
      new Slug(command.slug),
      command.parentId ? new ParentId(command.parentId) : null,
      command.icon ? new Icon(command.icon) : null,
      command.headerUrl ? new HeaderUrl(command.headerUrl) : null,
      new Accessibility(command.accessibility as AllowedAccessibilities),
      command.price
        ? new Price(
          new PriceValue(command.price.value),
          new PriceCurrency(command.price.currency)
        )
        : null,
      new CommunityId(command.communityId)
    )
  }
}
