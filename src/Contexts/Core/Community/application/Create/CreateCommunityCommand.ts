import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateCommunityCommand implements Command {
  constructor (
        readonly id: string,
        readonly name: string,
        readonly slug: string,
        readonly parentId: Nullable<string>,
        readonly logoUrl: Nullable<string>,
        readonly bannerUrl: Nullable<string>,
        readonly suffix: string,
        readonly color: string,
        readonly expiresAt: Date,
        readonly allowedFeatures: string[],
        readonly allowedUsers: number,
        readonly allowedSubcommunities: number
  ) {}
}
