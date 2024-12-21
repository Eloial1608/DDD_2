import { Creator } from '@Core/PlanForUsers/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PlanForUsersRepositoryMock } from '../../_mocks_/PlanForUsersRepositoryMock'
import { PlanForUsersMother } from '../../domain/PlanForUsersMother'
import { CreatePlanForUsersCommandMother } from './CreatePlanForUsersCommandMother'
import { PlanForUsersAlreadyExists } from '@Core/PlanForUsers/domain/errors/PlanForUsersAlreadyExistsById'
import { PlanForUsersCreatedDomainEvent } from '@Core/PlanForUsers/domain/events/PlanForUsersCreatedDomainEvent'
import { CreatePlanForUsersCommandHandler } from '@Core/PlanForUsers/application/Create/CreatePlanForUsersCommandHandler'

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
    const PlanForUsers = PlanForUsersMother.random()

    const command = CreatePlanForUsersCommandMother.fromAggregate(PlanForUsers)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(PlanForUsers)
  })

  test('Fail if a PlanForUsers with the same id already exists', async () => {
    const PlanForUsers = PlanForUsersMother.random()
    const existingPlanForUsers = PlanForUsersMother.create({ id: PlanForUsers.id })

    const command = CreatePlanForUsersCommandMother.fromAggregate(PlanForUsers)

    repository.returnOnFind(existingPlanForUsers)

    expect(handler.handle(command)).rejects.toThrow(PlanForUsersAlreadyExists)
  })

  test('Create a new PlanForUsersCreatedDomainEvent', async () => {
    const PlanForUsers = PlanForUsersMother.random()

    const command = CreatePlanForUsersCommandMother.fromAggregate(PlanForUsers)

    await handler.handle(command)

    const expectedEvent = PlanForUsersCreatedDomainEvent.fromAggregate(PlanForUsers)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
