import { FindThreadsByCriteriaQueryHandler } from '@Threads/Thread/application/FindByCriteria/FindThreadsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Threads/Thread/application/FindByCriteria/FinderByCriteria'
import { ThreadRepositoryMock } from '../../__mocks__/ThreadRepositoryMock'
import { ThreadMother } from '../../domain/ThreadMother'
import { FindThreadsByCriteriaQuery } from '@Threads/Thread/application/FindByCriteria/FindThreadsByCriteriaQuery'
import { ThreadCollectionResponse } from '@Threads/Thread/application/ThreadCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: ThreadRepositoryMock
let finder: FinderByCriteria
let handler: FindThreadsByCriteriaQueryHandler

describe('FindThreadsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new ThreadRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindThreadsByCriteriaQueryHandler(finder)
  })

  test('Return a thread collection', async () => {
    const thread = ThreadMother.random()

    repository.returnOnSearch([thread])

    const query = new FindThreadsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new ThreadCollectionResponse([thread]))
  })
})
