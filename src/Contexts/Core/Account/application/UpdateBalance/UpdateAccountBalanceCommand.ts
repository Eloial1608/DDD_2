import { Command } from '@Shared/domain/CommandBus/Command';


export class UpdateAccountBalanceCommand implements Command {
  constructor(
    readonly id: string,
    readonly balance: number,
  ) {}
}