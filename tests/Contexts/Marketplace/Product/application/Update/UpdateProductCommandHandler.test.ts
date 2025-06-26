import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ProductRepositoryMock } from '../../__mocks__/ProductRepositoryMock'
import { UpdateProductCommandHandler } from '@Marketplace/Products/application/Update/UpdateProductCommandHandler'
import { Updater } from '@Marketplace/Products/application/Update/Updater'
import { UserMother } from '@Tests/Contexts/Marketplace/User/domain/UserMother'
import { ProductMother } from '../../domain/ProductMother'
import { UpdateProductCommandMother } from './UpdateProductCommandMother'
import { ProductUpdatedDomainEvent } from '@Marketplace/Products/domain/Events/ProductUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: ProductRepositoryMock
let handler: UpdateProductCommandHandler
let updater: Updater

describe('UpdateProductCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ProductRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateProductCommandHandler(updater)
  })

  test('Update a new product', async () => {
    const user = UserMother.random()

    const product = ProductMother.forAuthor(user)

    const command = UpdateProductCommandMother.fromAggregate(product)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(product)
  })

  test('Fail if a product with the same id already exists', async () => {
    const user = UserMother.random()

    const product = ProductMother.forAuthor(user)

    const existingProduct = ProductMother.create({ id: product.id })

    const command = UpdateProductCommandMother.fromAggregate(product)

    repository.returnOnFind(existingProduct)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Update a new ProductUpdatedDomainEvent', async () => {
    const user = UserMother.random()

    const product = ProductMother.forAuthor(user)

    const command = UpdateProductCommandMother.fromAggregate(product)

    await handler.handle(command)

    const expectedEvent = ProductUpdatedDomainEvent.fromAggregate(product)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
