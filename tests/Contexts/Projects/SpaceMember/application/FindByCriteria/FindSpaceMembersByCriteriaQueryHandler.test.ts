import { FindSpaceMembersByCriteriaQueryHandler } from '@Projects/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Projects/SpaceMember/application/FindByCriteria/FinderByCriteria'
import { SpaceMemberRepositoryMock } from '../../__mocks__/SpaceMemberRepositoryMock'
import { SpaceMemberMother } from '../../domain/SpaceMemberMother'
import { FindSpaceMembersByCriteriaQuery } from '@Projects/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Projects/SpaceMember/application/SpaceMemberCollectionResponse'
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

  test('Return a spaceMember collection', async () => {
    const spaceMember = SpaceMemberMother.random()

    repository.returnOnSearch([spaceMember])

    const query = new FindSpaceMembersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new SpaceMemberCollectionResponse([spaceMember]))
  })
})
