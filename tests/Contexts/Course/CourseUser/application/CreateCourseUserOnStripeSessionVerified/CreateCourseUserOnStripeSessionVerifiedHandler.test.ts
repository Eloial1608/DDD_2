import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CourseUserRepositoryMock } from '../../__mocks__/CourseUserRepositoryMock'
import { CreateCourseUserOnStripeSessionVerifiedHandler } from '@Course/CourseUser/application/CreateCourseUserOnStripeSessionVerified/CreateCourseUserOnStripeSessionVerifiedHandler'
import { Creator } from '@Course/CourseUser/application/CreateCourseUserOnStripeSessionVerified/Creator'
import { CourseUserMother } from '../../domain/CourseUserMother'
import { StripeSessionMother } from '@Tests/Contexts/Stripe/StripeSession/domain/StripeSessionMother'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { CourseUserCreatedDomainEvent } from '@Course/CourseUser/domain/Events/CourseUserCreatedDomainEvent'
import { CourseId } from '@Course/CourseUser/domain/ValueObjects/CourseId'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'

let repository: CourseUserRepositoryMock
let eventBus: EventBusMock
let handler: CreateCourseUserOnStripeSessionVerifiedHandler
let creator: Creator

describe('CreateCourseUserOnStripeSessionVerifiedHandler should ', () => {
  beforeEach(() => {
    repository = new CourseUserRepositoryMock()
    eventBus = new EventBusMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateCourseUserOnStripeSessionVerifiedHandler(creator)
  })

  test('Create a user plan', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.COURSE)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedCourseUser = CourseUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      courseId: new CourseId(stripeSession.product.id)
    })

    repository.assertPersistHasBeenCalledWith(expectedCourseUser)
  })

  test('create a new CourseUserCreatedDomainEvent', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.COURSE)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedCourseUser = CourseUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      courseId: new CourseId(stripeSession.product.id)
    })

    const expectedEvent = CourseUserCreatedDomainEvent.fromAggregate(expectedCourseUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
