import type { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindDigitalStocksByCriteriaQuery } from './FindDigitalStocksByCriteriaQuery'
import type { Query } from '@Shared/domain/QueryBus/Query'
import type { FinderByCriteria } from './FinderByCriteria'
import { DigitalStockCollectionResponse } from '../DigitalStockCollectionResponse'

export class FindDigitalStocksByCriteriaQueryHandler implements QueryHandler<FindDigitalStocksByCriteriaQuery, DigitalStockCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {}

  subscribedTo (): Query {
    return FindDigitalStocksByCriteriaQuery
  }

  async handle (query: FindDigitalStocksByCriteriaQuery): Promise<DigitalStockCollectionResponse> {
    return new DigitalStockCollectionResponse(await this.finder.run(query.criteria))
  }
}
