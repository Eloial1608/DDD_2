import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PostUserRepositoryMock } from '../../__mocks__/PostUserRepositoryMock'
import { CreatePostUserOnStripeSessionVerifiedHandler } from '@Posts/PostUser/application/CreatePostUserOnStripeSessionVerified/CreatePostUserOnStripeSessionVerifiedHandler'
import { Creator } from '@Posts/PostUser/application/CreatePostUserOnStripeSessionVerified/Creator'
import { PostUserMother } from '../../domain/PostUserMother'
import { StripeSessionMother } from '@Tests/Contexts/Stripe/StripeSession/domain/StripeSessionMother'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { PostUserCreatedDomainEvent } from '@Posts/PostUser/domain/Events/PostUserCreatedDomainEvent'
import { PostId } from '@Posts/PostUser/domain/ValueObjects/PostId'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'

let repository: PostUserRepositoryMock
let eventBus: EventBusMock
let handler: CreatePostUserOnStripeSessionVerifiedHandler
let creator: Creator

describe('CreatePostUserOnStripeSessionVerifiedHandler should ', () => {
  beforeEach(() => {
    repository = new PostUserRepositoryMock()
    eventBus = new EventBusMock()
    creator = new Creator(repository, eventBus)
    handler = new CreatePostUserOnStripeSessionVerifiedHandler(creator)
  })

  test('Create a user plan', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.POSTS)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedPostUser = PostUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      postId: new PostId(stripeSession.product.id)
    })

    repository.assertPersistHasBeenCalledWith(expectedPostUser)
  })

  test('create a new PostUserCreatedDomainEvent', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.POSTS)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedPostUser = PostUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      postId: new PostId(stripeSession.product.id)
    })

    const expectedEvent = PostUserCreatedDomainEvent.fromAggregate(expectedPostUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
