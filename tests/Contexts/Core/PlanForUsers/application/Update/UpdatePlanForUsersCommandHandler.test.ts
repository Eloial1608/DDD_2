import { Updater } from '@Core/PlanForUsers/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PlanForUsersMother } from '../../domain/PlanForUsersMother'
import { UpdatePlanForUsersCommandMother } from './UpdatePlanForUsersCommandMother'
import { UpdatePlanForUsersCommandHandler } from '@Core/PlanForUsers/application/Update/UpdatePlanForUsersCommandHandler'
import { PlanForUsersRepositoryMock } from '../../__mocks__/PlanForUsersRepositoryMock'
import { PlanForUsersUpdatedDomainEvent } from '@Core/PlanForUsers/domain/Event/PlanForUsersUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: PlanForUsersRepositoryMock
let handler: UpdatePlanForUsersCommandHandler
let updater: Updater

describe('UpdatePlanForUsersCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PlanForUsersRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdatePlanForUsersCommandHandler(updater)
  })

  test('Update a PlanForUsers', async () => {
    const planForUsers = PlanForUsersMother.random()
    const existingPlan = PlanForUsersMother.create({ id: planForUsers.id, communityId: planForUsers.communityId })

    repository.returnOnFind(existingPlan)

    const command = UpdatePlanForUsersCommandMother.fromAggregate(planForUsers)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(planForUsers)
  })

  test('Update a new PlanForUsersUpdatedDomainEvent', async () => {
    const planForUsers = PlanForUsersMother.random()
    const existingPlan = PlanForUsersMother.create({ id: planForUsers.id, communityId: planForUsers.communityId })

    repository.returnOnFind(existingPlan)

    const command = UpdatePlanForUsersCommandMother.fromAggregate(planForUsers)

    await handler.handle(command)

    const expectedEvent = PlanForUsersUpdatedDomainEvent.fromAggregate(planForUsers)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
