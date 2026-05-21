import { Command } from '@Shared/domain/CommandBus/Command';

export class UpdateCardPinCommand implements Command {
  constructor(
    readonly id: string,
    readonly cardPin: string
  ) {}
}