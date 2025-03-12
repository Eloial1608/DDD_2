import { FindLikesByCriteriaQueryHandler } from '@Threads/Like/application/FindByCriteria/FindLikesByCriteriaQueryHandler'
import { FinderByCriteria } from '@Threads/Like/application/FindByCriteria/FinderByCriteria'
import { LikeRepositoryMock } from '../../__mocks__/LikeRepositoryMock'
import { LikeMother } from '../../domain/LikeMother'
import { FindLikesByCriteriaQuery } from '@Threads/Like/application/FindByCriteria/FindLikesByCriteriaQuery'
import { LikeCollectionResponse } from '@Threads/Like/application/LikeCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: LikeRepositoryMock
let finder: FinderByCriteria
let handler: FindLikesByCriteriaQueryHandler

describe('FindLikesByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new LikeRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindLikesByCriteriaQueryHandler(finder)
  })

  test('Return a like collection', async () => {
    const like = LikeMother.random()

    repository.returnOnSearch([like])

    const query = new FindLikesByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new LikeCollectionResponse([like]))
  })
})
