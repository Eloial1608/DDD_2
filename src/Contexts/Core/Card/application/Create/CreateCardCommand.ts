import { CardTypeEnum } from "@Core/Card/domain/ValueObjects/Type_Card";
import { Command } from "@Shared/domain/CommandBus/Command";

export class CreateCardCommand implements Command {
  constructor(
    readonly type_Card: CardTypeEnum,
    readonly cardPin: string,
    readonly accountId: string,
    readonly isBlocked: boolean = false
  ) {}
}