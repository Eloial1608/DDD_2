import { Command } from '@Shared/domain/CommandBus/Command';

export class UpdateCardCommand implements Command {
  constructor(
    readonly id: string,
    readonly cardPin: string,
    readonly balance: number,
    readonly limit: number,
    readonly isBlocked: boolean
  ) {}
}