import { FindSpaceUserTitlesByCriteriaQueryHandler } from '@Core/SpaceUserTitle/application/FindByCriteria/FindSpaceUserTitlesByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/SpaceUserTitle/application/FindByCriteria/FinderByCriteria'
import { SpaceUserTitleRepositoryMock } from '../../__mocks__/SpaceUserTitleRepositoryMock'
import { SpaceUserTitleMother } from '../../domain/SpaceUserTitleMother'
import { FindSpaceUserTitlesByCriteriaQuery } from '@Core/SpaceUserTitle/application/FindByCriteria/FindSpaceUserTitlesByCriteriaQuery'
import { SpaceUserTitleCollectionResponse } from '@Core/SpaceUserTitle/application/SpaceUserTitleCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: SpaceUserTitleRepositoryMock
let finder: FinderByCriteria
let handler: FindSpaceUserTitlesByCriteriaQueryHandler

describe('FindSpaceUserTitlesByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new SpaceUserTitleRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindSpaceUserTitlesByCriteriaQueryHandler(finder)
  })

  test('Return a spaceUserTitle collection', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()

    repository.returnOnSearch([spaceUserTitle])

    const query = new FindSpaceUserTitlesByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new SpaceUserTitleCollectionResponse([spaceUserTitle]))
  })
})
