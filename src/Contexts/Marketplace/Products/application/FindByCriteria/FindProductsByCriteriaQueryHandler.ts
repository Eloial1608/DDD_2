import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindProductsByCriteriaQuery } from './FindProductsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ProductCollectionResponse } from '../ProductCollectionResponse'

export class FindProductsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindProductsByCriteriaQuery, ProductCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindProductsByCriteriaQuery
  }

  async handle (data: FindProductsByCriteriaQuery): Promise<ProductCollectionResponse> {
    return new ProductCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
