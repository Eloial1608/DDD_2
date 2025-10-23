import { FindLevelsByCriteriaQueryHandler } from '@Core/Level/application/FindByCriteria/FindLevelsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/Level/application/FindByCriteria/FinderByCriteria'
import { LevelRepositoryMock } from '../../__mocks__/LevelRepositoryMock'
import { LevelMother } from '../../domain/LevelMother'
import { FindLevelsByCriteriaQuery } from '@Core/Level/application/FindByCriteria/FindLevelsByCriteriaQuery'
import { LevelCollectionResponse } from '@Core/Level/application/LevelCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: LevelRepositoryMock
let finder: FinderByCriteria
let handler: FindLevelsByCriteriaQueryHandler

describe('FindLevelsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new LevelRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindLevelsByCriteriaQueryHandler(finder)
  })

  test('Return a level collection', async () => {
    const level = LevelMother.random()

    repository.returnOnSearch([level])

    const query = new FindLevelsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new LevelCollectionResponse([level]))
  })
})
