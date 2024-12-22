import { FinderById } from '@Core/PlanForUsers/application/Find/FinderById'
import { PlanForUsersRepositoryMock } from '../../__mocks__/PlanForUsersRepositoryMock'
import { PlanForUsersMother } from '../../domain/PlanForUsersMother'
import { FindPlanForUsersQuery } from '@Core/PlanForUsers/application/Find/FindPlanForUsersQuery'
import { PlanForUsersResponse } from '@Core/PlanForUsers/application/PlanForUsersResponse'
import { PlanForUsersNotFound } from '@Core/PlanForUsers/domain/Errors/PlanForUsersNotFound'
import { FindPlanForUsersQueryHandler } from '@Core/PlanForUsers/application/Find/FindPlanForUsersQueryHandler'

let repository: PlanForUsersRepositoryMock
let finder: FinderById
let handler: FindPlanForUsersQueryHandler

describe('FindPlanForUsersQueryHandler should', () => {
  beforeEach(() => {
    repository = new PlanForUsersRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindPlanForUsersQueryHandler(finder)
  })

  test('Return a planForUsers', async () => {
    const planForUsers = PlanForUsersMother.random()

    repository.returnOnFind(planForUsers)

    const query = new FindPlanForUsersQuery(planForUsers.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(planForUsers.id)
    expect(response).toEqual(new PlanForUsersResponse(planForUsers))
  })

  test('Fail if a planForUsers doesnt exists', async () => {
    const planForUsers = PlanForUsersMother.random()

    const query = new FindPlanForUsersQuery(planForUsers.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(PlanForUsersNotFound)
  })
})
