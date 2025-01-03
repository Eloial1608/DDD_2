import { Creator } from '@Core/PlanForUsers/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PlanForUsersMother } from '../../domain/PlanForUsersMother'
import { CreatePlanForUsersCommandMother } from './CreatePlanForUsersCommandMother'
import { PlanForUsersAlreadyExists } from '@Core/PlanForUsers/domain/Event/PlanForUsersAlreadyExistsById'
import { PlanForUsersCreatedDomainEvent } from '@Core/PlanForUsers/domain/Event/PlanForUsersCreatedDomainEvent'
import { CreatePlanForUsersCommandHandler } from '@Core/PlanForUsers/application/Create/CreatePlanForUsersCommandHandler'
import { PlanForUsersRepositoryMock } from '../../__mocks__/PlanForUsersRepositoryMock'

let eventBus: EventBusMock
let repository: PlanForUsersRepositoryMock
let handler: CreatePlanForUsersCommandHandler
let creator: Creator

describe('CreatePlanForUsersCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PlanForUsersRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreatePlanForUsersCommandHandler(creator)
  })

  test('Create a new PlanForUsers', async () => {
    const planForUsers = PlanForUsersMother.random()

    const command = CreatePlanForUsersCommandMother.fromAggregate(planForUsers)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(planForUsers)
  })

  test('Fail if a PlanForUsers with the same id already exists', async () => {
    const planForUsers = PlanForUsersMother.random()
    const existingPlanForUsers = PlanForUsersMother.create({ id: planForUsers.id })

    const command = CreatePlanForUsersCommandMother.fromAggregate(planForUsers)

    repository.returnOnFind(existingPlanForUsers)

    expect(handler.handle(command)).rejects.toThrow(PlanForUsersAlreadyExists)
  })

  test('Create a new PlanForUsersCreatedDomainEvent', async () => {
    const planForUsers = PlanForUsersMother.random()

    const command = CreatePlanForUsersCommandMother.fromAggregate(planForUsers)

    await handler.handle(command)

    const expectedEvent = PlanForUsersCreatedDomainEvent.fromAggregate(planForUsers)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
