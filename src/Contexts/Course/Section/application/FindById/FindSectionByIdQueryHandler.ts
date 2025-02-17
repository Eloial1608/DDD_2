import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindSectionByIdQuery } from './FindSectionByIdQuery'
import { SectionResponse } from '../SectionResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Course/Section/domain/ValueObjects/Id'

export class FindSectionByIdQueryHandler implements QueryHandler<FindSectionByIdQuery, SectionResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindSectionByIdQuery
  }

  async handle (data: FindSectionByIdQuery): Promise<SectionResponse> {
    return new SectionResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
