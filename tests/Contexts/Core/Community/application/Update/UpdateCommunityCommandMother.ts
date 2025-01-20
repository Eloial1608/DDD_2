import { UpdateCommunityCommand } from '@Core/Community/application/Update/UpdateCommunityCommand'
import { Community } from '@Core/Community/domain/Community'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateCommunityCommandMother {
  static update (
    id: string,
    name: string,
    suffix: string,
    slug: string,
    domain: Nullable<string>,
    about: Nullable<string>,
    isPrivate: boolean,
    isRegisterOpen: boolean,
    logoUrl: Nullable<string>,
    bannerUrl: Nullable<string>,
    color: object
  ): UpdateCommunityCommand {
    return new UpdateCommunityCommand(
      id,
      name,
      slug,
      domain,
      about,
      isPrivate,
      isRegisterOpen,
      logoUrl,
      bannerUrl,
      suffix,
      color
    )
  }

  static fromAggregate (community: Community): UpdateCommunityCommand {
    return this.update(
      community.id.valueOf(),
      community.name.valueOf(),
      community.suffix.valueOf(),
      community.slug.valueOf(),
      community.domain?.valueOf(),
      community.about?.valueOf(),
      community.isPrivate.valueOf(),
      community.isRegisterOpen.valueOf(),
      community.logoUrl?.valueOf(),
      community.bannerUrl?.valueOf(),
      community.color.valueOf()
    )
  }
}
