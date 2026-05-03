import { Command } from '@Shared/domain/CommandBus/Command';

export class UpdateCardLimitCommand implements Command {
  constructor(
    readonly id: string,
    readonly limitCard: number
  ) {}
}