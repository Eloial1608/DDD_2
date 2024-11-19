import { FindCommunityByIdQueryHandler } from '@Core/Community/application/FindById/FindCommunityByIdQueryHandler'
import { FinderById } from '@Core/Community/application/FindById/FinderById'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '../../domain/CommunityMother'
import { FindCommunityByIdQuery } from '@Core/Community/application/FindById/FindCommunityByIdQuery'
import { CommunityResponse } from '@Core/Community/application/CommunityResponse'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'

let repository: CommunityRepositoryMock
let finder: FinderById
let handler: FindCommunityByIdQueryHandler

describe('FindCommunityByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new CommunityRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindCommunityByIdQueryHandler(finder)
  })

  test('Return a community', async () => {
    const community = CommunityMother.random()

    repository.returnOnFind(community)

    const query = new FindCommunityByIdQuery(community.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(community.id)
    expect(response).toEqual(new CommunityResponse(community))
  })

  test('Fail if a community doesnt exists', async () => {
    const community = CommunityMother.random()

    const query = new FindCommunityByIdQuery(community.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(CommunityNotFound)
  })
})
