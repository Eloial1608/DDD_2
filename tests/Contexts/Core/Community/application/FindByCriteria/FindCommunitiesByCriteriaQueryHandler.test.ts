import { FindCommunitiesByCriteriaQueryHandler } from '@Core/Community/application/FindByCriteria/FindCommunitiesByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/Community/application/FindByCriteria/FinderByCriteria'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '../../domain/CommunityMother'
import { FindCommunitiesByCriteriaQuery } from '@Core/Community/application/FindByCriteria/FindCommunitiesByCriteriaQuery'
import { CommunityCollectionResponse } from '@Core/Community/application/CommunityCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: CommunityRepositoryMock
let finder: FinderByCriteria
let handler: FindCommunitiesByCriteriaQueryHandler

describe('FindCommunitiesByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new CommunityRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindCommunitiesByCriteriaQueryHandler(finder)
  })

  test('Return a community collection', async () => {
    const community = CommunityMother.random()

    repository.returnOnSearch([community])

    const query = new FindCommunitiesByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new CommunityCollectionResponse([community]))
  })
})
