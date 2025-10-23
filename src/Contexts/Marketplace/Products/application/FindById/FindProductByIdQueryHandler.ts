import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindProductByIdQuery } from './FindProductByIdQuery'
import { ProductResponse } from '../ProductResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'

export class FindProductByIdQueryHandler implements QueryHandler<FindProductByIdQuery, ProductResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindProductByIdQuery
  }

  async handle (data: FindProductByIdQuery): Promise<ProductResponse> {
    return new ProductResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
