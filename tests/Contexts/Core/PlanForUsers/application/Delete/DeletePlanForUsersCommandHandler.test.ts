import { DeletePlanForUsersCommandHandler } from '@Core/PlanForUsers/application/Delete/DeletePlanForUsersCommandHandler'
import { Deleter } from '@Core/PlanForUsers/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PlanForUsersRepositoryMock } from '../../__mocks__/PlanForUsersRepositoryMock'
import { PlanForUsersMother } from '../../domain/PlanForUsersMother'
import { DeletePlanForUsersCommandMother } from './DeletePlanForUsersCommandMother'
import { PlanForUsersDeletedDomainEvent } from '@Core/PlanForUsers/domain/Event/PlanForUsersDeletedDomainEvent'

let eventBus: EventBusMock
let repository: PlanForUsersRepositoryMock
let handler: DeletePlanForUsersCommandHandler
let deleter: Deleter

describe('DeletePlanForUsersCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PlanForUsersRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeletePlanForUsersCommandHandler(deleter)
  })

  test('Delete a planForUsers', async () => {
    const planForUsers = PlanForUsersMother.random()

    repository.returnOnFind(planForUsers)

    const command = DeletePlanForUsersCommandMother.fromAggregate(planForUsers)

    await handler.handle(command)

    repository.assertDeleteHasBeenCalledWith(planForUsers)
  })

  test('Delete a new PlanForUsersDeletedDomainEvent', async () => {
    const planForUsers = PlanForUsersMother.random()

    repository.returnOnFind(planForUsers)

    const command = DeletePlanForUsersCommandMother.fromAggregate(planForUsers)

    await handler.handle(command)

    const expectedEvent = PlanForUsersDeletedDomainEvent.fromAggregate(planForUsers)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
