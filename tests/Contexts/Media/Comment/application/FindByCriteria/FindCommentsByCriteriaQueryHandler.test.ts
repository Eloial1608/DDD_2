import { FindCommentsByCriteriaQueryHandler } from '@Media/Comment/application/FindByCriteria/FindCommentsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Media/Comment/application/FindByCriteria/FinderByCriteria'
import { CommentRepositoryMock } from '../../__mocks__/CommentRepositoryMock'
import { CommentMother } from '../../domain/CommentMother'
import { FindCommentsByCriteriaQuery } from '@Media/Comment/application/FindByCriteria/FindCommentsByCriteriaQuery'
import { CommentCollectionResponse } from '@Media/Comment/application/CommentCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: CommentRepositoryMock
let finder: FinderByCriteria
let handler: FindCommentsByCriteriaQueryHandler

describe('FindCommentsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new CommentRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindCommentsByCriteriaQueryHandler(finder)
  })

  test('Return a comment collection', async () => {
    const comment = CommentMother.random()

    repository.returnOnSearch([comment])

    const query = new FindCommentsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new CommentCollectionResponse([comment]))
  })
})
