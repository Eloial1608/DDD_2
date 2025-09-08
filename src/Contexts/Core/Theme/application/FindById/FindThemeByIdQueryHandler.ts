import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindThemeByIdQuery } from './FindThemeByIdQuery'
import { ThemeResponse } from '../ThemeResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'

export class FindThemeByIdQueryHandler implements QueryHandler<FindThemeByIdQuery, ThemeResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindThemeByIdQuery
  }

  async handle (data: FindThemeByIdQuery): Promise<ThemeResponse> {
    return new ThemeResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
