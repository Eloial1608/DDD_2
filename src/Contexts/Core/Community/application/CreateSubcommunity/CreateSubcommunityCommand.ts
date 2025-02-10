import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateSubcommunityCommand implements Command {
  constructor (
        readonly id: string,
        readonly name: string,
        readonly slug: string,
        readonly about: Nullable<string>,
        readonly parentId: string,
        readonly logoUrl: Nullable<string>,
        readonly bannerUrl: Nullable<string>
  ) {}
}
