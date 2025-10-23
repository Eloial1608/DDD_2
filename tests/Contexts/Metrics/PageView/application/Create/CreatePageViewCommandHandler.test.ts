import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { PageViewRepositoryMock } from '../../__mocks__/PageViewRepositoryMock'
import { CreatePageViewCommandHandler } from '@Metrics/PageView/application/Create/CreatePageViewCommandHandler'
import { Creator } from '@Metrics/PageView/application/Create/Creator'
import { PageViewMother } from '../../domain/PageViewMother'
import { CreatePageViewCommandMother } from './CreatePageViewCommandMother'
import { PageViewCreatedDomainEvent } from '@Metrics/PageView/domain/Events/PageViewCreatedDomainEvent'

let eventBus: EventBusMock
let repository: PageViewRepositoryMock
let queryBus: QueryBusMock
let handler: CreatePageViewCommandHandler
let creator: Creator

describe('CreatePageViewCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PageViewRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus)
    handler = new CreatePageViewCommandHandler(creator)
  })

  test('Create a new pageview', async () => {
    const pageview = PageViewMother.random()

    const command = CreatePageViewCommandMother.fromAggregate(pageview)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(pageview)
  })

  test('Fail if a pageview with the same id already exists', async () => {
    const pageview = PageViewMother.random()

    const command = CreatePageViewCommandMother.fromAggregate(pageview)

    repository.returnOnFind(pageview)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new PageViewCreatedDomainEvent', async () => {
    const pageview = PageViewMother.random()

    const command = CreatePageViewCommandMother.fromAggregate(pageview)

    await handler.handle(command)

    const expectedEvent = PageViewCreatedDomainEvent.fromAggregate(pageview)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
