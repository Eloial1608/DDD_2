import { Creator } from '@Marketplace/DigitalStock/application/Create/Creator'
import { DigitalStockRepositoryMock } from '../../__mocks__/DigitalStockRepositoryMock'
import { DigitalStockMother } from '../../domain/DigitalStockMother'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { DigitalStockCreatedDomainEvent } from '@Marketplace/DigitalStock/domain/Events/DigitalStockCreatedDomainEvent'
import { CreateDigitalStockCommandMother } from './CreateDigitalStockCommandMother'
import { CreateDigitalStockCommandHandler } from '@Marketplace/DigitalStock/application/Create/CreateDigitalStockCommandHandler'

describe('DigitalStock Creator', () => {
  let repository: DigitalStockRepositoryMock
  let eventBus: EventBusMock
  let creator: Creator
  let handler: CreateDigitalStockCommandHandler

  beforeEach(() => {
    repository = new DigitalStockRepositoryMock()
    eventBus = new EventBusMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateDigitalStockCommandHandler(creator)
  })

  it('should create and persist a new DigitalStock and publish event', async () => {
    const stock = DigitalStockMother.random()
    repository.returnOnFind(null)

    const command = CreateDigitalStockCommandMother.fromAggregate(stock)

    await handler.handle(command)

    repository.assertFindHasBeenCalledWith(stock.id)
    repository.assertPersistHasBeenCalledWith(stock)

    const expectedEvent = DigitalStockCreatedDomainEvent.fromAggregate(stock)
    eventBus.assertEventHasBeenPublished(expectedEvent)
  })

  it('should not create if DigitalStock already exists', async () => {
    const stock = DigitalStockMother.random()
    repository.returnOnFind(stock)

    const command = CreateDigitalStockCommandMother.fromAggregate(stock)

    await handler.handle(command)

    repository.assertFindHasBeenCalledWith(stock.id)
    repository.assertPersistHasNotBeenCalled()
    eventBus.assertNonEventHasBeenPublished()
  })
})
