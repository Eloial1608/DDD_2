import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteFormCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
