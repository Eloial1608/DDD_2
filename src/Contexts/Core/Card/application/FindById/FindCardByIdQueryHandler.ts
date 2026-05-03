import { Id } from '@Core/Card/domain/ValueObjects/Id';

import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler';
import { FinderById } from './FinderById';
import { CardResponse } from '../CardResponse';
import { FindCardByIdQuery } from './FindCardByIdQuery';

export class FindCardByIdQueryHandler
  implements QueryHandler<FindCardByIdQuery, CardResponse>
{
  constructor(private readonly finder: FinderById) {}

  subscribedTo(): typeof FindCardByIdQuery {
    return FindCardByIdQuery;
  }

  async handle(query: FindCardByIdQuery): Promise<CardResponse> {
    const card = await this.finder.find(new Id(query.id));

    return CardResponse.from(card);
  }
}