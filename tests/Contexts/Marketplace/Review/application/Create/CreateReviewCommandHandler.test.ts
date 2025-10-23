import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ReviewRepositoryMock } from '../../__mocks__/ReviewRepositoryMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CreateReviewCommandHandler } from '@Marketplace/Reviews/application/Create/CreateReviewCommandHandler'
import { Creator } from '@Marketplace/Reviews/application/Create/Creator'
import { UserMother } from '@Tests/Contexts/Marketplace/User/domain/UserMother'
import { ReviewMother } from '../../domain/ReviewMother'
import { FindUsersByCriteriaQuery } from '@Marketplace/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Marketplace/User/application/UserCollectionResponse'
import { CreateReviewCommandMother } from './CreateReviewCommandMother'
import { ReviewCreatedDomainEvent } from '@Marketplace/Reviews/domain/Events/ReviewCreatedDomainEvent'
import { FindProductByIdQuery } from '@Marketplace/Products/application/FindById/FindProductByIdQuery'
import { ProductResponse } from '@Marketplace/Products/application/ProductResponse'
import { ProductMother } from '@Tests/Contexts/Marketplace/Product/domain/ProductMother'

let eventBus: EventBusMock
let repository: ReviewRepositoryMock
let queryBus: QueryBusMock
let handler: CreateReviewCommandHandler
let creator: Creator

describe('CreateReviewCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ReviewRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateReviewCommandHandler(creator)
  })

  test('Create a new review', async () => {
    const user = UserMother.random()

    const review = ReviewMother.forAuthor(user)

    const product = ProductMother.create({
      id: review.productId
    })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindProductByIdQuery(review.productId.valueOf()), new ProductResponse(product))

    const command = CreateReviewCommandMother.fromAggregate(review)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(review)
  })

  test('Fail if a review with the same id already exists', async () => {
    const user = UserMother.random()

    const review = ReviewMother.forAuthor(user)

    const existingReview = ReviewMother.create({ id: review.id })

    const product = ProductMother.create({
      id: review.productId
    })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindProductByIdQuery(review.productId.valueOf()), new ProductResponse(product))

    const command = CreateReviewCommandMother.fromAggregate(review)

    repository.returnOnFind(existingReview)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new ReviewCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const review = ReviewMother.forAuthor(user)

    const product = ProductMother.create({
      id: review.productId
    })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindProductByIdQuery(review.productId.valueOf()), new ProductResponse(product))

    const command = CreateReviewCommandMother.fromAggregate(review)

    await handler.handle(command)

    const expectedEvent = ReviewCreatedDomainEvent.fromAggregate(review)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
