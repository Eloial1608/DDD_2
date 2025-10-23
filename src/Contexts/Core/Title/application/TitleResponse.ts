import { Nullable } from '@Shared/domain/Nullable'
import { Title } from '../domain/Title'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type TitleResponseBody = {
    readonly id: string
    readonly name: string
    readonly communityId: string
    readonly titleImageUrl: Nullable<string>
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly deletedAt: Nullable<Date>
}

export class TitleResponse implements QueryResponse<TitleResponseBody> {
  response: TitleResponseBody

  constructor (title: Title) {
    this.response = {
      id: title.id.valueOf(),
      name: title.name.valueOf(),
      communityId: title.communityId.valueOf(),
      titleImageUrl: title.titleImageUrl?.valueOf(),
      createdAt: title.createdAt.valueOf(),
      updatedAt: title.updatedAt.valueOf(),
      deletedAt: title.deletedAt?.valueOf() || null

    }
  }
}
