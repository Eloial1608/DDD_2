import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCommentsByCriteriaQuery } from './FindCommentsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { CommentCollectionResponse } from '../CommentCollectionResponse'

export class FindCommentsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindCommentsByCriteriaQuery, CommentCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindCommentsByCriteriaQuery
  }

  async handle (data: FindCommentsByCriteriaQuery): Promise<CommentCollectionResponse> {
    return new CommentCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
