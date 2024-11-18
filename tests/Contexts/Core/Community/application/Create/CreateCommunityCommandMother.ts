import { CreateCommunityCommand } from '@Core/Community/application/Create/CreateCommunityCommand'
import { Community } from '@Core/Community/domain/Community'

export class CreateCommunityCommandMother {
  static create (
    id: string,
    name: string,
    suffix: string,
    planId: string,
    color: string,
    homeSpaceId: string,
    expiresAt: Date,
    allowedFeatures: string[],
    allowedUsers: number
  ): CreateCommunityCommand {
    return new CreateCommunityCommand(
      id,
      name,
      suffix,
      planId,
      color,
      homeSpaceId,
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
      community.planId.valueOf(),
      community.color.valueOf(),
      community.homeSpaceId.valueOf(),
      community.expiresAt.valueOf(),
      community.allowedFeatures.valueOf().map(x => x.valueOf()),
      community.allowedUsers.valueOf()
    )
  }
}
