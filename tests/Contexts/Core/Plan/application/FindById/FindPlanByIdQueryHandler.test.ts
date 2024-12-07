import { FindPlanByIdQueryHandler } from '@Core/Plan/application/FindById/FindPlanByIdQueryHandler'
import { FinderById } from '@Core/Plan/application/FindById/FinderById'
import { PlanRepositoryMock } from '../../__mocks__/PlanRepositoryMock'
import { PlanMother } from '../../domain/PlanMother'
import { FindPlanByIdQuery } from '@Core/Plan/application/FindById/FindPlanByIdQuery'
import { PlanResponse } from '@Core/Plan/application/PlanResponse'
import { PlanNotFound } from '@Core/Plan/domain/Errors/PlanNotFound'

let repository: PlanRepositoryMock
let finder: FinderById
let handler: FindPlanByIdQueryHandler

describe('FindPlanByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new PlanRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindPlanByIdQueryHandler(finder)
  })

  test('Return a plan', async () => {
    const plan = PlanMother.random()

    repository.returnOnFind(plan)

    const query = new FindPlanByIdQuery(plan.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(plan.id)
    expect(response).toEqual(new PlanResponse(plan))
  })

  test('Fail if a plan doesnt exists', async () => {
    const plan = PlanMother.random()

    const query = new FindPlanByIdQuery(plan.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(PlanNotFound)
  })
})
