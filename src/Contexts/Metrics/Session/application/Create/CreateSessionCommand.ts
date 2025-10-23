import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateSessionCommand implements Command {
  constructor (
    public readonly id: string,
    public readonly communityId: string,
    public readonly userId: string,
    public readonly country: string,
    public readonly city: string
  ) {}
}
