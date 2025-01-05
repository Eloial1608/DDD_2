import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { MediaUserRepositoryMock } from '../../__mocks__/MediaUserRepositoryMock'
import { CreateMediaUserOnStripeSessionVerifiedHandler } from '@Media/MediaUser/application/CreateMediaUserOnStripeSessionVerified/CreateMediaUserOnStripeSessionVerifiedHandler'
import { Creator } from '@Media/MediaUser/application/CreateMediaUserOnStripeSessionVerified/Creator'
import { MediaUserMother } from '../../domain/MediaUserMother'
import { StripeSessionMother } from '@Tests/Contexts/Stripe/StripeSession/domain/StripeSessionMother'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { MediaUserCreatedDomainEvent } from '@Media/MediaUser/domain/Events/MediaUserCreatedDomainEvent'
import { MediaId } from '@Media/MediaUser/domain/ValueObjects/MediaId'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'

let repository: MediaUserRepositoryMock
let eventBus: EventBusMock
let handler: CreateMediaUserOnStripeSessionVerifiedHandler
let creator: Creator

describe('CreateMediaUserOnStripeSessionVerifiedHandler should ', () => {
  beforeEach(() => {
    repository = new MediaUserRepositoryMock()
    eventBus = new EventBusMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateMediaUserOnStripeSessionVerifiedHandler(creator)
  })

  test('Create a user plan', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.MEDIA)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedMediaUser = MediaUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      mediaId: new MediaId(stripeSession.product.id)
    })

    repository.assertPersistHasBeenCalledWith(expectedMediaUser)
  })

  test('create a new MediaUserCreatedDomainEvent', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.MEDIA)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedMediaUser = MediaUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      mediaId: new MediaId(stripeSession.product.id)
    })

    const expectedEvent = MediaUserCreatedDomainEvent.fromAggregate(expectedMediaUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
