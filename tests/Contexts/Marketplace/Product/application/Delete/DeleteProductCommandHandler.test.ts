import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ProductRepositoryMock } from '../../__mocks__/ProductRepositoryMock'
import { DeleteProductCommandHandler } from '@Marketplace/Products/application/Delete/DeleteProductCommandHandler'
import { Deleter } from '@Marketplace/Products/application/Delete/Deleter'
import { UserMother } from '@Tests/Contexts/Marketplace/User/domain/UserMother'
import { ProductMother } from '../../domain/ProductMother'
import { DeleteProductCommandMother } from './DeleteProductCommandMother'
import { ProductDeletedDomainEvent } from '@Marketplace/Products/domain/Events/ProductDeletedDomainEvent'
import { DeletedAt } from '@Marketplace/Products/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: ProductRepositoryMock
let handler: DeleteProductCommandHandler
let deleter: Deleter

describe('DeleteProductCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ProductRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteProductCommandHandler(deleter)
  })

  test('Delete a product', async () => {
    const user = UserMother.random()

    const product = ProductMother.forAuthor(user)

    repository.returnOnFind(product)

    const command = DeleteProductCommandMother.fromAggregate(product)

    await handler.handle(command)

    const expectedProduct = ProductMother.create({
      ...product,
      deletedAt: new DeletedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expectedProduct)
  })

  test('Fail if a product with the same id doesnt exists', async () => {
    const user = UserMother.random()

    const product = ProductMother.forAuthor(user)

    const command = DeleteProductCommandMother.fromAggregate(product)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new ProductDeletedDomainEvent', async () => {
    const user = UserMother.random()

    const product = ProductMother.forAuthor(user)

    repository.returnOnFind(product)

    const command = DeleteProductCommandMother.fromAggregate(product)

    await handler.handle(command)

    const expectedProduct = ProductMother.create({
      ...product,
      deletedAt: new DeletedAt(new Date())
    })

    const expectedEvent = ProductDeletedDomainEvent.fromAggregate(expectedProduct)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
