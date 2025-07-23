import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ActionRepositoryMock } from '../../__mocks__/ActionRepositoryMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CreateActionCommandHandler } from '@Marketplace/Action/application/Create/CreateActionCommandHandler'
import { Creator } from '@Marketplace/Action/application/Create/Creator'
import { ActionMother } from '../../domain/ActionMother'
import { CreateActionCommandMother } from './CreateActionCommandMother'
import { ActionCreatedDomainEvent } from '@Marketplace/Action/domain/Events/ActionCreatedDomainEvent'
import { FindProductByIdQuery } from '@Marketplace/Products/application/FindById/FindProductByIdQuery'
import { ProductResponse } from '@Marketplace/Products/application/ProductResponse'
import { ProductMother } from '@Tests/Contexts/Marketplace/Product/domain/ProductMother'

let eventBus: EventBusMock
let repository: ActionRepositoryMock
let queryBus: QueryBusMock
let handler: CreateActionCommandHandler
let creator: Creator

describe('CreateActionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ActionRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateActionCommandHandler(creator)
  })

  test('Create a new action', async () => {
    const action = ActionMother.random()

    const product = ProductMother.create({
      id: action.productId
    })

    queryBus.returnOnQuery(new FindProductByIdQuery(action.productId.valueOf()), new ProductResponse(product))

    const command = CreateActionCommandMother.fromAggregate(action)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(action)
  })

  test('Fail if a action with the same id already exists', async () => {
    const action = ActionMother.random()

    const existingAction = ActionMother.create({ id: action.id })

    const product = ProductMother.create({
      id: action.productId
    })

    queryBus.returnOnQuery(new FindProductByIdQuery(action.productId.valueOf()), new ProductResponse(product))

    const command = CreateActionCommandMother.fromAggregate(action)

    repository.returnOnFind(existingAction)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new ActionCreatedDomainEvent', async () => {
    const action = ActionMother.random()

    const product = ProductMother.create({
      id: action.productId
    })

    queryBus.returnOnQuery(new FindProductByIdQuery(action.productId.valueOf()), new ProductResponse(product))

    const command = CreateActionCommandMother.fromAggregate(action)

    await handler.handle(command)

    const expectedEvent = ActionCreatedDomainEvent.fromAggregate(action)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
