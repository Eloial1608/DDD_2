import { FindMediaUsersByCriteriaQueryHandler } from '@Media/MediaUser/application/FindByCriteria/FindMediaUsersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Media/MediaUser/application/FindByCriteria/FinderByCriteria'
import { MediaUserRepositoryMock } from '../../__mocks__/MediaUserRepositoryMock'
import { MediaUserMother } from '../../domain/MediaUserMother'
import { FindMediaUsersByCriteriaQuery } from '@Media/MediaUser/application/FindByCriteria/FindMediaUsersByCriteriaQuery'
import { MediaUserCollectionResponse } from '@Media/MediaUser/application/MediaUserCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: MediaUserRepositoryMock
let finder: FinderByCriteria
let handler: FindMediaUsersByCriteriaQueryHandler

describe('FindMediaUsersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new MediaUserRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindMediaUsersByCriteriaQueryHandler(finder)
  })

  test('Return a mediaUser collection', async () => {
    const mediaUser = MediaUserMother.random()

    repository.returnOnSearch([mediaUser])

    const query = new FindMediaUsersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new MediaUserCollectionResponse([mediaUser]))
  })
})
