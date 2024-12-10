import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindSpaceMemberQuery } from './FindSpaceMemberQuery'
import { SpaceMemberResponse } from '../SpaceMemberResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'

export class FindSpaceMemberQueryHandler implements QueryHandler<FindSpaceMemberQuery, SpaceMemberResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindSpaceMemberQuery
  }

  async handle (data: FindSpaceMemberQuery): Promise<SpaceMemberResponse> {
    return new SpaceMemberResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
