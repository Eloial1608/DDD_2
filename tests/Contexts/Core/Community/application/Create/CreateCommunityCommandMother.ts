import { CreateCommunityCommand } from '@Core/Community/application/Create/CreateCommunityCommand'
import { Community } from '@Core/Community/domain/Community'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateCommunityCommandMother {
  static create (
    id: string,
    name: string,
    suffix: string,
    slug: string,
    parentId: Nullable<string>,
    logoUrl: Nullable<string>,
    bannerUrl: Nullable<string>,
    color: string,
    expiresAt: Date,
    allowedFeatures: string[],
    allowedUsers: number
  ): CreateCommunityCommand {
    return new CreateCommunityCommand(
      id,
      name,
      slug,
      parentId,
      logoUrl,
      bannerUrl,
      suffix,
      color,
      expiresAt,
      allowedFeatures,
      allowedUsers
    )
  }

  static fromAggregate (community: Community): CreateCommunityCommand {
    return this.create(
      community.id.valueOf(),
      community.name.valueOf(),
      community.suffix.valueOf(),
      community.slug.valueOf(),
      community.parentId?.valueOf(),
      community.logoUrl?.valueOf(),
      community.bannerUrl?.valueOf(),
      community.color.valueOf(),
      community.expiresAt.valueOf(),
      community.allowedFeatures.valueOf().map(x => x.valueOf()),
      community.allowedUsers.valueOf()
    )
  }
}
