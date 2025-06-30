import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ReviewRepositoryMock } from '../../__mocks__/ReviewRepositoryMock'
import { DeleteReviewCommandHandler } from '@Marketplace/Reviews/application/Delete/DeleteReviewCommandHandler'
import { Deleter } from '@Marketplace/Reviews/application/Delete/Deleter'
import { UserMother } from '@Tests/Contexts/Marketplace/User/domain/UserMother'
import { ReviewMother } from '../../domain/ReviewMother'
import { DeleteReviewCommandMother } from './DeleteReviewCommandMother'
import { ReviewDeletedDomainEvent } from '@Marketplace/Reviews/domain/Events/ReviewDeletedDomainEvent'

let eventBus: EventBusMock
let repository: ReviewRepositoryMock
let handler: DeleteReviewCommandHandler
let deleter: Deleter

describe('DeleteReviewCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ReviewRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteReviewCommandHandler(deleter)
  })

  test('Delete a review', async () => {
    const user = UserMother.random()

    const review = ReviewMother.forAuthor(user)

    repository.returnOnFind(review)

    const command = DeleteReviewCommandMother.fromAggregate(review)

    await handler.handle(command)

    const expectedReview = ReviewMother.create({
      ...review
    })

    repository.assertPersistHasBeenCalledWith(expectedReview)
  })

  test('Fail if a review with the same id doesnt exists', async () => {
    const user = UserMother.random()

    const review = ReviewMother.forAuthor(user)

    const command = DeleteReviewCommandMother.fromAggregate(review)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new ReviewDeletedDomainEvent', async () => {
    const user = UserMother.random()

    const review = ReviewMother.forAuthor(user)

    repository.returnOnFind(review)

    const command = DeleteReviewCommandMother.fromAggregate(review)

    await handler.handle(command)

    const expectedReview = ReviewMother.create({
      ...review
    })

    const expectedEvent = ReviewDeletedDomainEvent.fromAggregate(expectedReview)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
