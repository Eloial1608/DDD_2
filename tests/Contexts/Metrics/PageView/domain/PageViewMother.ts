import { PageView } from '@Metrics/PageView/domain/PageView'
import { CommunityId } from '@Metrics/PageView/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/PageView/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/PageView/domain/ValueObjects/Id'
import { SpaceID } from '@Metrics/PageView/domain/ValueObjects/SpaceId'
import { UserId } from '@Metrics/PageView/domain/ValueObjects/UserId'

import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class PageViewMother {
  static create (params: Partial<PageView>): PageView {
    return new PageView(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.spaceId ?? new SpaceID(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): PageView {
    return this.create({})
  }
}
