import { Nullable } from '@Shared/domain/Nullable'
import { Space } from '../domain/Space'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type SpaceResponseBody = {
    readonly id: string
    readonly name: string
    readonly slug: string
    readonly parentId: Nullable<string>
    readonly icon: Nullable<string>
    readonly createdBy: string
    readonly accessibility: string
    readonly type: string
    readonly headerUrl: Nullable<string>
    readonly price: Nullable<{value: number, currency: string}>
    readonly communityId: string
    readonly totalMembers: number
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class SpaceResponse implements QueryResponse<SpaceResponseBody> {
  response: SpaceResponseBody

  constructor (space: Space) {
    this.response = {
      id: space.id.valueOf(),
      name: space.name.valueOf(),
      slug: space.slug.valueOf(),
      createdBy: space.createdBy.valueOf(),
      accessibility: space.accessibility.valueOf(),
      type: space.type.valueOf(),
      price: space.price
        ? {
            value: space.price.value.valueOf(),
            currency: space.price.currency.valueOf()
          }
        : null,
      icon: space.icon?.valueOf(),
      parentId: space.parentId?.valueOf(),
      headerUrl: space.headerUrl?.valueOf(),
      communityId: space.communityId.valueOf(),
      totalMembers: space.totalMembers.valueOf(),
      createdAt: space.createdAt.valueOf(),
      updatedAt: space.updatedAt.valueOf()
    }
  }
}
