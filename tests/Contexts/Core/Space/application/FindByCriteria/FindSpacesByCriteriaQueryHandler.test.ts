import { FindSpacesByCriteriaQueryHandler } from '@Core/Space/application/FindByCriteria/FindSpacesByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/Space/application/FindByCriteria/FinderByCriteria'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { FindSpacesByCriteriaQuery } from '@Core/Space/application/FindByCriteria/FindSpacesByCriteriaQuery'
import { SpaceCollectionResponse } from '@Core/Space/application/SpaceCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: SpaceRepositoryMock
let finder: FinderByCriteria
let handler: FindSpacesByCriteriaQueryHandler

describe('FindSpacesByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new SpaceRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindSpacesByCriteriaQueryHandler(finder)
  })

  test('Return a space collection', async () => {
    const space = SpaceMother.random()

    repository.returnOnSearch([space])

    const query = new FindSpacesByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new SpaceCollectionResponse([space]))
  })
})
