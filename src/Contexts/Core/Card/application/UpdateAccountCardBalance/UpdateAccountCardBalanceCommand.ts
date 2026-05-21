import { Command } from '@Shared/domain/CommandBus/Command';

export class UpdateAccountCardBalanceCommand implements Command {
  constructor(
    readonly id: string,
    readonly balance: number
  ) {}
}