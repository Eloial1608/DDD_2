import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateFormCommand implements Command {
  constructor (
        readonly id: string,
        readonly name: string,
        readonly content: object[],
        readonly isActive: boolean,
        readonly communityId: string,
        readonly createdBy: string
  ) {}
}
