import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler';
import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler';

import { FinderByCriteria } from './FinderByCriteria';
import { CardCollectionResponse } from '../CardCollectionResponse';
import { FindCardsByCriteriaQuery } from './FindCardByCriteriaQuery';

export class FindCardsByCriteriaQueryHandler extends CriteriaHandler  implements QueryHandler<FindCardsByCriteriaQuery, CardCollectionResponse>
{
  constructor(private readonly finder: FinderByCriteria) {
    super();
  }

  subscribedTo(): typeof FindCardsByCriteriaQuery {
    return FindCardsByCriteriaQuery;
  }

  async handle(query: FindCardsByCriteriaQuery): Promise<CardCollectionResponse> {
    const criteria = this.buildCriteria(query);
    const cards = await this.finder.find(criteria);

    return new CardCollectionResponse(cards);
  }
}