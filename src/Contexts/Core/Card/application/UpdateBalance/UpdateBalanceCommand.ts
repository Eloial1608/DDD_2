import { Command } from '@Shared/domain/CommandBus/Command';

export class UpdateBalanceCommand implements Command {
  constructor(
    readonly id: string,
    readonly balance: number
  ) {}
}