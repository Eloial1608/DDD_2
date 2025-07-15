import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateProjectUserCommand implements Command {
  constructor (
        readonly id:string,
        readonly userId: string,
        readonly projectId: string
  ) {}
}
