import { Updater } from '@Marketplace/DigitalStock/application/Update/Updater'
import { DigitalStockRepositoryMock } from '../../__mocks__/DigitalStockRepositoryMock'
import { DigitalStockMother } from '../../domain/DigitalStockMother'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { DigitalStockUpdatedDomainEvent } from '@Marketplace/DigitalStock/domain/Events/DigitalStockUpdatedDomainEvent'
import { UpdateDigitalStockCommandMother } from './UpdateDigitalStockCommandMother'
import { UpdateDigitalStockCommandHandler } from '@Marketplace/DigitalStock/application/Update/UpdateDigitalStockCommandHandler'
import { DigitalStockNotFound } from '@Marketplace/DigitalStock/domain/Errors/DigitalStockNotFound'

describe('DigitalStock Updater', () => {
  let repository: DigitalStockRepositoryMock
  let eventBus: EventBusMock
  let updater: Updater
  let handler: UpdateDigitalStockCommandHandler

  beforeEach(() => {
    repository = new DigitalStockRepositoryMock()
    eventBus = new EventBusMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateDigitalStockCommandHandler(updater)
  })

  it('should update and persist an existing DigitalStock and publish event', async () => {
    const stock = DigitalStockMother.random()
    repository.returnOnFind(stock)

    const command = UpdateDigitalStockCommandMother.fromAggregate(stock)

    await handler.handle(command)

    repository.assertFindHasBeenCalledWith(stock.id)
    repository.assertPersistHasBeenCalledWith(stock)

    const expectedEvent = DigitalStockUpdatedDomainEvent.fromAggregate(stock)
    eventBus.assertEventHasBeenPublished(expectedEvent)
  })

  it('should throw DigitalStockNotFound if DigitalStock does not exist', async () => {
    const stock = DigitalStockMother.random()
    repository.returnOnFind(null)

    const command = UpdateDigitalStockCommandMother.fromAggregate(stock)

    await expect(handler.handle(command)).rejects.toThrowError(DigitalStockNotFound)
    repository.assertFindHasBeenCalledWith(stock.id)
    repository.assertPersistHasNotBeenCalled()
    eventBus.assertNonEventHasBeenPublished()
  })
})
