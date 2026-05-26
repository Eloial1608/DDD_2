import { Command } from '@Shared/domain/CommandBus/Command';

export class UpdateIsBlockedCommand implements Command {
  constructor(
    readonly id: string,
    readonly isBlocked: boolean,
  ) {}
}