import { CreateStripeSessionCommandHandler } from '@Stripe/StripeSession/application/Create/CreateStripeSessionCommandHandler'
import { Creator } from '@Stripe/StripeSession/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { StripeSessionRepositoryMock } from '../../__mocks__/StripeSessionRepositoryMock'
import { StripeSessionMother } from '../../domain/StripeSessionMother'
import { CreateStripeSessionCommandMother } from './CreateStripeSessionCommandMother'
import { StripeSessionCreatedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionCreatedDomainEvent'
import { HttpStripeSessionRepositoryMock } from '../../__mocks__/HttpStripeSessionRepositoryMock'
import { StripeSessionAlreadyExists } from '@Stripe/StripeSession/domain/Errors/StripeSessionAlreadyExists'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { StripeProductMother } from '@Tests/Contexts/Stripe/StripeProduct/domain/StripeProductMother'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { StripeAccountMother } from '@Tests/Contexts/Stripe/StripeAccount/domain/StripeAccountMother'
import { FindStripeProductByIdQuery } from '@Stripe/StripeProduct/application/FindById/FindStripeProductByIdQuery'
import { StripeProductResponse } from '@Stripe/StripeProduct/application/StripeProductResponse'
import { FindStripeAccountByIdQuery } from '@Stripe/StripeAccount/application/FindById/FindStripeAccountByIdQuery'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { Product } from '@Stripe/StripeSession/domain/ValueObjects/Product'
import { StripeId } from '@Stripe/StripeSession/domain/ValueObjects/StripeId'
import { Url } from '@Stripe/StripeSession/domain/ValueObjects/Url'

let eventBus: EventBusMock
let repository: StripeSessionRepositoryMock
let queryBus: QueryBusMock
let stripeRepository: HttpStripeSessionRepositoryMock
let handler: CreateStripeSessionCommandHandler
let creator: Creator

describe('CreateStripeSessionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new StripeSessionRepositoryMock()
    stripeRepository = new HttpStripeSessionRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, stripeRepository, queryBus, eventBus)
    handler = new CreateStripeSessionCommandHandler(creator)
  })

  test('Create a new stripeSession', async () => {
    const stripeSession = StripeSessionMother.random()
    const stripeProduct = StripeProductMother.create({
      id: new Id(stripeSession.product.id)
    })
    const stripeAccount = StripeAccountMother.create({
      id: stripeSession.accountId
    })

    queryBus.returnOnQuery(new FindStripeProductByIdQuery(stripeProduct.id.valueOf()), new StripeProductResponse(stripeProduct))
    queryBus.returnOnQuery(new FindStripeAccountByIdQuery(stripeAccount.id.valueOf()), new StripeAccountResponse(stripeAccount))

    const command = CreateStripeSessionCommandMother.fromAggregate(stripeSession)

    await handler.handle(command)

    const expectedStripeSession = StripeSessionMother.create({
      ...stripeSession,
      price: stripeProduct.price,
      product: new Product(
        stripeProduct.id.valueOf(),
        stripeProduct.productType.valueOf(),
        stripeProduct.priceId.valueOf(),
        stripeProduct.name.valueOf(),
        stripeProduct.renovationInterval?.valueOf(),
        stripeProduct.renovationType?.valueOf()
      ),
      stripeId: new StripeId('a'),
      url: new Url('https://www.a.com')
    })

    repository.assertPersistHasBeenCalledWith(expectedStripeSession)
  })

  test('Fail if a stripeSession with the same id already exists', async () => {
    const stripeSession = StripeSessionMother.random()
    const existingStripeSession = StripeSessionMother.create({ id: stripeSession.id })

    const stripeProduct = StripeProductMother.create({
      id: new Id(stripeSession.product.id)
    })
    const stripeAccount = StripeAccountMother.create({
      id: stripeSession.accountId
    })

    queryBus.returnOnQuery(new FindStripeProductByIdQuery(stripeProduct.id.valueOf()), new StripeProductResponse(stripeProduct))
    queryBus.returnOnQuery(new FindStripeAccountByIdQuery(stripeAccount.id.valueOf()), new StripeAccountResponse(stripeAccount))

    const command = CreateStripeSessionCommandMother.fromAggregate(stripeSession)

    repository.returnOnFind(existingStripeSession)

    expect(handler.handle(command)).rejects.toThrow(StripeSessionAlreadyExists)
  })

  test('Create a new StripeSessionCreatedDomainEvent', async () => {
    const stripeSession = StripeSessionMother.random()
    const stripeProduct = StripeProductMother.create({
      id: new Id(stripeSession.product.id)
    })
    const stripeAccount = StripeAccountMother.create({
      id: stripeSession.accountId
    })

    queryBus.returnOnQuery(new FindStripeProductByIdQuery(stripeProduct.id.valueOf()), new StripeProductResponse(stripeProduct))
    queryBus.returnOnQuery(new FindStripeAccountByIdQuery(stripeAccount.id.valueOf()), new StripeAccountResponse(stripeAccount))

    const command = CreateStripeSessionCommandMother.fromAggregate(stripeSession)

    await handler.handle(command)

    const expectedStripeSession = StripeSessionMother.create({
      ...stripeSession,
      price: stripeProduct.price,
      product: new Product(
        stripeProduct.id.valueOf(),
        stripeProduct.productType.valueOf(),
        stripeProduct.priceId.valueOf(),
        stripeProduct.name.valueOf(),
        stripeProduct.renovationInterval?.valueOf(),
        stripeProduct.renovationType?.valueOf()
      ),
      stripeId: new StripeId('a'),
      url: new Url('https://www.a.com')
    })

    const expectedEvent = StripeSessionCreatedDomainEvent.fromAggregate(expectedStripeSession)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
