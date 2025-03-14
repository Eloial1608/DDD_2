import { FindThreadUsersByCriteriaQueryHandler } from '@Threads/ThreadUser/application/FindByCriteria/FindThreadUsersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Threads/ThreadUser/application/FindByCriteria/FinderByCriteria'
import { ThreadUserRepositoryMock } from '../../__mocks__/ThreadUserRepositoryMock'
import { ThreadUserMother } from '../../domain/ThreadUserMother'
import { FindThreadUsersByCriteriaQuery } from '@Threads/ThreadUser/application/FindByCriteria/FindThreadUsersByCriteriaQuery'
import { ThreadUserCollectionResponse } from '@Threads/ThreadUser/application/ThreadUserCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: ThreadUserRepositoryMock
let finder: FinderByCriteria
let handler: FindThreadUsersByCriteriaQueryHandler

describe('FindThreadUsersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new ThreadUserRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindThreadUsersByCriteriaQueryHandler(finder)
  })

  test('Return a threadUser collection', async () => {
    const threadUser = ThreadUserMother.random()

    repository.returnOnSearch([threadUser])

    const query = new FindThreadUsersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new ThreadUserCollectionResponse([threadUser]))
  })
})
