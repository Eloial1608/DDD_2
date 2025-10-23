import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Metrics/Session/domain/ValueObjects/Id'
import { CommunityId } from '@Metrics/Session/domain/ValueObjects/CommunityId'
import { UserId } from '@Metrics/Session/domain/ValueObjects/UserId'
import { Country } from '@Metrics/Session/domain/ValueObjects/Country'
import { City } from '@Metrics/Session/domain/ValueObjects/City'
import { CreateSessionCommand } from './CreateSessionCommand'

export class CreateSessionCommandHandler implements CommandHandler<CreateSessionCommand> {
  constructor (
        private readonly creator: Creator
  ) {}

  subscribedTo (): Command {
    return CreateSessionCommand
  }

  async handle (command: CreateSessionCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId),
      new Country(command.country),
      new City(command.city)
    )
  }
}
