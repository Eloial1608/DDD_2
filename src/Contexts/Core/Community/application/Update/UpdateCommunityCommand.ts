import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateCommunityCommand implements Command {
  constructor (
        readonly id: string,
        readonly name: string,
        readonly slug: string,
        readonly domain: Nullable<string>,
        readonly about: Nullable<string>,
        readonly isPrivate: boolean,
        readonly isRegisterOpen: boolean,
        readonly logoUrl: Nullable<string>,
        readonly bannerUrl: Nullable<string>,
        readonly suffix: Nullable<string>,
        readonly color: object
  ) {}
}
