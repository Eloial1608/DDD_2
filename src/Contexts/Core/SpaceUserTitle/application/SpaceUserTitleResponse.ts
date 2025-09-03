import { SpaceUserTitle } from '../domain/SpaceUserTitle'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type SpaceUserTitleResponseBody = {
    readonly id: string
    readonly communityId: string
    readonly titleId: string
    readonly userId: string
    readonly spaceUserTitleId: string
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class SpaceUserTitleResponse implements QueryResponse<SpaceUserTitleResponseBody> {
  response: SpaceUserTitleResponseBody

  constructor (spaceUserTitle: SpaceUserTitle) {
    this.response = {
      id: spaceUserTitle.id.valueOf(),
      titleId: spaceUserTitle.titleId.valueOf(),
      userId: spaceUserTitle.userId.valueOf(),
      spaceUserTitleId: spaceUserTitle.spaceId.valueOf(),
      communityId: spaceUserTitle.communityId.valueOf(),
      createdAt: spaceUserTitle.createdAt.valueOf(),
      updatedAt: spaceUserTitle.updatedAt.valueOf()
    }
  }
}
