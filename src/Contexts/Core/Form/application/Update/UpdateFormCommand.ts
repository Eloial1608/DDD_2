import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateFormCommand implements Command {
  constructor (
    readonly id: string,
    readonly name: string,
    readonly content: object[],
    readonly isActive: boolean,
    readonly communityId: string
  ) {}
}
