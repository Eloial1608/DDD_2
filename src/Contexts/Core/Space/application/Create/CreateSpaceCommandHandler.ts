import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateSpaceCommand } from './CreateSpaceCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { Name } from '@Core/Space/domain/ValueObjects/Name'
import { Slug } from '@Core/Space/domain/ValueObjects/Slug'
import { ParentId } from '@Core/Space/domain/ValueObjects/ParentId'
import { Icon } from '@Core/Space/domain/ValueObjects/Icon'
import { HeaderUrl } from '@Core/Space/domain/ValueObjects/HeaderUrl'
import { AllowedTypes, Type } from '@Core/Space/domain/ValueObjects/Type'
import { CreatedBy } from '@Core/Space/domain/ValueObjects/CreatedBy'
import { Accessibility, AllowedAccessibilities } from '@Core/Space/domain/ValueObjects/Accessibility'
import { Price, PriceCurrency, PriceValue } from '@Core/Space/domain/ValueObjects/Price'
import { CommunityId } from '@Core/Space/domain/ValueObjects/CommunityId'

export class CreateSpaceCommandHandler implements CommandHandler<CreateSpaceCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateSpaceCommand
  }

  async handle (command: CreateSpaceCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new Name(command.name),
      new Slug(command.slug),
      command.parentId ? new ParentId(command.parentId) : null,
      command.icon ? new Icon(command.icon) : null,
      command.headerUrl ? new HeaderUrl(command.headerUrl) : null,
      new Type(command.type as AllowedTypes),
      new CreatedBy(command.createdBy),
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
