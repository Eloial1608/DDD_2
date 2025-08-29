import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateTitleCommand implements Command {
  constructor (
        readonly id: string,
        readonly name: string,
        readonly communityId: string,
        readonly titleImageUrl: Nullable<string>,
  ) {}
}
