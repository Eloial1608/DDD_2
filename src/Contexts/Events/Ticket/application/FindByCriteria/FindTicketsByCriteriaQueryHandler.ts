import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindTicketsByCriteriaQuery } from './FindTicketsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { TicketCollectionResponse } from '../TicketCollectionResponse'

export class FindTicketsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindTicketsByCriteriaQuery, TicketCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindTicketsByCriteriaQuery
  }

  async handle (data: FindTicketsByCriteriaQuery): Promise<TicketCollectionResponse> {
    return new TicketCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
