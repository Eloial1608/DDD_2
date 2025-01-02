import { FindPostsByCriteriaQueryHandler } from '@Posts/Post/application/FindByCriteria/FindPostsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Posts/Post/application/FindByCriteria/FinderByCriteria'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { FindPostsByCriteriaQuery } from '@Posts/Post/application/FindByCriteria/FindPostsByCriteriaQuery'
import { PostCollectionResponse } from '@Posts/Post/application/PostCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: PostRepositoryMock
let finder: FinderByCriteria
let handler: FindPostsByCriteriaQueryHandler

describe('FindPostsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new PostRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindPostsByCriteriaQueryHandler(finder)
  })

  test('Return a post collection', async () => {
    const post = PostMother.random()

    repository.returnOnSearch([post])

    const query = new FindPostsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new PostCollectionResponse([post]))
  })
})
