import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateTypeCommand implements Command {
  constructor (
    readonly id: string,
    readonly title: string,
    readonly description: Nullable< string>,
    readonly color: string,
    readonly projectId: Nullable< string>,
    readonly communityId: string
  ) {}
}
