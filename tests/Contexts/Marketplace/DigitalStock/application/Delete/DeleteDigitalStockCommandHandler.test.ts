import { Deleter } from '@Marketplace/DigitalStock/application/Delete/Deleter'
import { DigitalStockRepositoryMock } from '../../__mocks__/DigitalStockRepositoryMock'
import { DigitalStockMother } from '../../domain/DigitalStockMother'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { DigitalStockDeletedDomainEvent } from '@Marketplace/DigitalStock/domain/Events/DigitalStockDeletedDomainEvent'
import { DeleteDigitalStockCommandMother } from './DeleteDigitalStockCommandMother'
import { DeleteDigitalStockCommandHandler } from '@Marketplace/DigitalStock/application/Delete/DeleteDigitalStockCommandHandler'

describe('DigitalStock Deleter', () => {
  let repository: DigitalStockRepositoryMock
  let eventBus: EventBusMock
  let deleter: Deleter
  let handler: DeleteDigitalStockCommandHandler

  beforeEach(() => {
    repository = new DigitalStockRepositoryMock()
    eventBus = new EventBusMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteDigitalStockCommandHandler(deleter)
  })

  it('should delete an existing DigitalStock and publish event', async () => {
    const stock = DigitalStockMother.random()
    repository.returnOnFind(stock)

    const command = DeleteDigitalStockCommandMother.fromAggregate(stock)

    await handler.handle(command)

    repository.assertFindHasBeenCalledWith(stock.id)
    repository.assertDeleteHasBeenCalledWith(stock)

    const expectedEvent = DigitalStockDeletedDomainEvent.fromAggregate(stock)
    eventBus.assertEventHasBeenPublished(expectedEvent)
  })

  it('should do nothing if DigitalStock does not exist', async () => {
    const stock = DigitalStockMother.random()
    repository.returnOnFind(null)

    const command = DeleteDigitalStockCommandMother.fromAggregate(stock)

    await handler.handle(command)

    repository.assertFindHasBeenCalledWith(stock.id)
    repository.assertDeleteHasNotBeenCalled()
    eventBus.assertNonEventHasBeenPublished()
  })
})
