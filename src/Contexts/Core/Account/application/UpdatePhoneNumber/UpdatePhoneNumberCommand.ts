import { Command } from '@Shared/domain/CommandBus/Command';

export class UpdateAccountCommand implements Command {
  constructor(
    readonly id: string,
    readonly phoneNumber: string
  ) {}
}