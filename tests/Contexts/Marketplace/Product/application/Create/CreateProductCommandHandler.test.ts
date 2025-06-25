import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ProductRepositoryMock } from '../../__mocks__/ProductRepositoryMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CreateProductCommandHandler } from '@Marketplace/Products/application/Create/CreateProductCommandHandler'
import { Creator } from '@Marketplace/Products/application/Create/Creator'
import { UserMother } from '@Tests/Contexts/Marketplace/User/domain/UserMother'
import { ProductMother } from '../../domain/ProductMother'
import { SpaceMother } from '@Tests/Contexts/Marketplace/Space/domain/SpaceMother'
import { FindUsersByCriteriaQuery } from '@Marketplace/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Marketplace/User/application/UserCollectionResponse'
import { FindSpaceByIdQuery } from '@Marketplace/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Marketplace/Space/application/SpaceResponse'
import { CreateProductCommandMother } from './CreateProductCommandMother'
import { ProductCreatedDomainEvent } from '@Marketplace/Products/domain/Events/ProductCreatedDomainEvent'

let eventBus: EventBusMock
let repository: ProductRepositoryMock
let queryBus: QueryBusMock
let handler: CreateProductCommandHandler
let creator: Creator

describe('CreateProductCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ProductRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateProductCommandHandler(creator)
  })

  test('Create a new product', async () => {
    const user = UserMother.random()

    const product = ProductMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: product.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateProductCommandMother.fromAggregate(product)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(product)
  })

  test('Fail if a product with the same id already exists', async () => {
    const user = UserMother.random()

    const product = ProductMother.forAuthor(user)

    const existingProduct = ProductMother.create({ id: product.id })

    const space = SpaceMother.create({ communityId: product.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateProductCommandMother.fromAggregate(product)

    repository.returnOnFind(existingProduct)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new ProductCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const product = ProductMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: product.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateProductCommandMother.fromAggregate(product)

    await handler.handle(command)

    const expectedEvent = ProductCreatedDomainEvent.fromAggregate(product)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
