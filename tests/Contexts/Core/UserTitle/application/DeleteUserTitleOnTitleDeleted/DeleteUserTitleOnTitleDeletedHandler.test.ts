import { Deleter } from '@Core/UserTitle/application/DeleteUserTitleOnTitleDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserTitleRepositoryMock } from '../../__mocks__/UserTitleRepositoryMock'
import { UserTitleMother } from '../../domain/UserTitleMother'
import { Id } from '@Core/Title/domain/ValueObjects/Id'
import { DeletedAt } from '@Core/Space/domain/ValueObjects/DeletedAt'
import { UserTitleDeletedDomainEvent } from '@Core/UserTitle/domain/Events/UserTitleDeletedDomainEvent'
import { TitleMother } from '@Tests/Contexts/Core/Title/domain/TitleMother'
import { TitleDeletedDomainEvent } from '@Core/Title/domain/Events/TitleDeletedDomainEvent'
import { DeleteUserTitleOnTitleDeletedHandler } from '@Core/UserTitle/application/DeleteUserTitleOnTitleDeleted/DeleteUserTitleOnTitleDeletedHandler'

let eventBus: EventBusMock
let repository: UserTitleRepositoryMock
let handler: DeleteUserTitleOnTitleDeletedHandler
let deleter: Deleter

describe('DeleteUserTitleOnTitleDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserTitleRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserTitleOnTitleDeletedHandler(deleter)
  })

  test('Delete userTitle', async () => {
    const existingUserTitle = UserTitleMother.random()

    const title = TitleMother.create({
      id: new Id(existingUserTitle.titleId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const userTitleCollection = [existingUserTitle]

    repository.returnOnSearch(userTitleCollection)

    const event = TitleDeletedDomainEvent.fromAggregate(title)

    await handler.on(event)

    const expectedSpace = UserTitleMother.create({
      ...existingUserTitle,
      deletedAt: new DeletedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expectedSpace)
  })

  test('update a new UserTitleDeletedDomainEvent', async () => {
    const existingUserTitle = UserTitleMother.random()

    const title = TitleMother.create({
      id: new Id(existingUserTitle.titleId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const titleCollection = [existingUserTitle]

    repository.returnOnSearch(titleCollection)

    const event = TitleDeletedDomainEvent.fromAggregate(title)

    await handler.on(event)

    const expectedSpace = UserTitleMother.create({
      ...existingUserTitle
    })

    const expectedEvent = UserTitleDeletedDomainEvent.fromAggregate(expectedSpace)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
