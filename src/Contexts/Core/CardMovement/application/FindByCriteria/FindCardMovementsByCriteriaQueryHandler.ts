import { CriteriaHandler } from "@Shared/domain/Criteria/CriteriaHandler"
import { QueryHandler } from "@Shared/domain/QueryBus/QueryHandler"
import { Query } from "@Shared/domain/QueryBus/Query"
import { CardMovementCollectionResponse } from "../CardMovementResponseCollectionResponse"
import { FindCardMovementsByCriteriaQuery } from "./FindCardMovementsByCriteriaQuery"
import { FinderByCriteria } from "./FinderByCriteria"

export class FindCardMovementsByCriteriaQueryHandler extends CriteriaHandler 
  implements QueryHandler<FindCardMovementsByCriteriaQuery, CardMovementCollectionResponse> {
    
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindCardMovementsByCriteriaQuery
  }

  async handle (data: FindCardMovementsByCriteriaQuery): Promise<CardMovementCollectionResponse> {
    return new CardMovementCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}