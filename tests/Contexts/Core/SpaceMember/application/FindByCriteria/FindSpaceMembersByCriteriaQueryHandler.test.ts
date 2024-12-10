import { FindSpaceMembersByCriteriaQueryHandler } from '@Core/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/SpaceMember/application/FindByCriteria/FinderByCriteria'
import { SpaceMemberRepositoryMock } from '../../__mocks__/SpaceMemberRepositoryMock'
import { SpaceMemberMother } from '../../domain/SpaceMemberMother'
import { FindSpaceMembersByCriteriaQuery } from '@Core/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Core/SpaceMember/application/SpaceMemberCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: SpaceMemberRepositoryMock
let finder: FinderByCriteria
let handler: FindSpaceMembersByCriteriaQueryHandler

describe('FindSpaceMembersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new SpaceMemberRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindSpaceMembersByCriteriaQueryHandler(finder)
  })

  test('Return a spacemember collection', async () => {
    const spacemember = SpaceMemberMother.random()

    repository.returnOnSearch([spacemember])

    const query = new FindSpaceMembersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new SpaceMemberCollectionResponse([spacemember]))
  })
})
