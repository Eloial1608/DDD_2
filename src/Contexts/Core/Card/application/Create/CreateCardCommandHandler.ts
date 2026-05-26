import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler';

import { CreateCardCommand } from './CreateCardCommand';
import { Creator } from './Creator';

import { Type_Card } from '@Core/Card/domain/ValueObjects/Type_Card';
import { CardPin } from '@Core/Card/domain/ValueObjects/CardPin';
import { AccountId } from '@Core/Card/domain/ValueObjects/AccountId';

export class CreateCardCommandHandler implements CommandHandler<CreateCardCommand> {

  constructor(
    private readonly creator: Creator
  ) {}

  subscribedTo() {
    return CreateCardCommand;
  }

  async handle(command: CreateCardCommand): Promise<void> {

    const typeCard = Type_Card.fromEnum(command.type_Card);

    await this.creator.run(
      typeCard,
      new CardPin(command.cardPin),
      new AccountId(command.accountId)
    );
  }
}