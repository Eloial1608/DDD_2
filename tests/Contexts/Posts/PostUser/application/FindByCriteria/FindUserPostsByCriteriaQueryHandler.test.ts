import { FindPostUsersByCriteriaQueryHandler } from '@Posts/PostUser/application/FindByCriteria/FindPostUsersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Posts/PostUser/application/FindByCriteria/FinderByCriteria'
import { PostUserRepositoryMock } from '../../__mocks__/PostUserRepositoryMock'
import { PostUserMother } from '../../domain/PostUserMother'
import { FindPostUsersByCriteriaQuery } from '@Posts/PostUser/application/FindByCriteria/FindPostUsersByCriteriaQuery'
import { PostUserCollectionResponse } from '@Posts/PostUser/application/PostUserCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: PostUserRepositoryMock
let finder: FinderByCriteria
let handler: FindPostUsersByCriteriaQueryHandler

describe('FindPostUsersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new PostUserRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindPostUsersByCriteriaQueryHandler(finder)
  })

  test('Return a postUser collection', async () => {
    const postUser = PostUserMother.random()

    repository.returnOnSearch([postUser])

    const query = new FindPostUsersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new PostUserCollectionResponse([postUser]))
  })
})
