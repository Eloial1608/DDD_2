import { FinderById } from '@Core/UserPlan/application/Find/FinderById'
import { UserPlanRepositoryMock } from '../../__mocks__/UserPlanRepositoryMock'
import { UserPlanMother } from '../../domain/UserPlanMother'
import { FindUserPlanQuery } from '@Core/UserPlan/application/Find/FindUserPlanQuery'
import { UserPlanResponse } from '@Core/UserPlan/application/UserPlanResponse'
import { UserPlanNotFound } from '@Core/UserPlan/domain/Errors/UserPlanNotFound'
import { FindUserPlanQueryHandler } from '@Core/UserPlan/application/Find/FindUserPlanQueryHandler'

let repository: UserPlanRepositoryMock
let finder: FinderById
let handler: FindUserPlanQueryHandler

describe('FindUserPlanQueryHandler should', () => {
  beforeEach(() => {
    repository = new UserPlanRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindUserPlanQueryHandler(finder)
  })

  test('Return a userPlan', async () => {
    const userPlan = UserPlanMother.random()

    repository.returnOnFind(userPlan)

    const query = new FindUserPlanQuery(userPlan.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(userPlan.id)
    expect(response).toEqual(new UserPlanResponse(userPlan))
  })

  test('Fail if a userPlan doesnt exists', async () => {
    const userPlan = UserPlanMother.random()

    const query = new FindUserPlanQuery(userPlan.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(UserPlanNotFound)
  })
})
