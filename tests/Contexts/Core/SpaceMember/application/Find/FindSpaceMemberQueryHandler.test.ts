import { FinderById } from '@Core/SpaceMember/application/Find/FinderById'
import { SpaceMemberRepositoryMock } from '../../__mocks__/SpaceMemberRepositoryMock'
import { SpaceMemberMother } from '../../domain/SpaceMemberMother'
import { FindSpaceMemberQuery } from '@Core/SpaceMember/application/Find/FindSpaceMemberQuery'
import { SpaceMemberResponse } from '@Core/SpaceMember/application/SpaceMemberResponse'
import { SpaceMemberNotFound } from '@Core/SpaceMember/domain/Errors/SpaceMemberNotFound'
import { FindSpaceMemberQueryHandler } from '@Core/SpaceMember/application/Find/FindSpaceMemberQueryHandler'

let repository: SpaceMemberRepositoryMock
let finder: FinderById
let handler: FindSpaceMemberQueryHandler

describe('FindSpaceMemberQueryHandler should', () => {
  beforeEach(() => {
    repository = new SpaceMemberRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindSpaceMemberQueryHandler(finder)
  })

  test('Return a spaceMember', async () => {
    const spaceMember = SpaceMemberMother.random()

    repository.returnOnFind(spaceMember)

    const query = new FindSpaceMemberQuery(spaceMember.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(spaceMember.id)
    expect(response).toEqual(new SpaceMemberResponse(spaceMember))
  })

  test('Fail if a spaceMember doesnt exists', async () => {
    const spaceMember = SpaceMemberMother.random()

    const query = new FindSpaceMemberQuery(spaceMember.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(SpaceMemberNotFound)
  })
})
