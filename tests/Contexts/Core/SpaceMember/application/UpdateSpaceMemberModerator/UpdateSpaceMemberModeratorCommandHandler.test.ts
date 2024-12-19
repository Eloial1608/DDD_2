import { UpdateSpaceMemberModeratorCommandHandler } from '@Core/SpaceMember/application/UpdateSpaceMemberModerator/UpdateSpaceMemberModeratorCommandHandler'
import { Updater } from '@Core/SpaceMember/application/UpdateSpaceMemberModerator/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceMemberRepositoryMock } from '../../__mocks__/SpaceMemberRepositoryMock'
import { SpaceMemberMother } from '../../domain/SpaceMemberMother'
import { UpdateSpaceMemberModeratorCommandMother } from './UpdateSpaceMemberModeratorCommandMother'
import { SpaceMemberModeratorUpdatedDomainEvent } from '@Core/SpaceMember/domain/Events/SpaceMemberModeratorUpdatedDomainEvent'
import { IsModerator } from '@Core/SpaceMember/domain/ValueObjects/IsModerator'

let eventBus: EventBusMock
let repository: SpaceMemberRepositoryMock
let handler: UpdateSpaceMemberModeratorCommandHandler
let updater: Updater

describe('UpdateSpaceMemberModeratorCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceMemberRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateSpaceMemberModeratorCommandHandler(updater)
  })

  test('Update a spaceMember is moderator', async () => {
    const spaceMember = SpaceMemberMother.create({ isModerator: new IsModerator(false) })

    const expected = SpaceMemberMother.create({
      ...spaceMember,
      isModerator: new IsModerator(true)
    })

    repository.returnOnFind(spaceMember)

    const command = UpdateSpaceMemberModeratorCommandMother.fromAggregate(expected)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(expected)
  })

  test('Create a SpaceMemberModeratorUpdatedDomainEvent', async () => {
    const spaceMember = SpaceMemberMother.create({ isModerator: new IsModerator(false) })

    const expected = SpaceMemberMother.create({
      ...spaceMember,
      isModerator: new IsModerator(true)
    })

    repository.returnOnFind(spaceMember)

    const command = UpdateSpaceMemberModeratorCommandMother.fromAggregate(expected)

    await handler.handle(command)

    const expectedEvent = SpaceMemberModeratorUpdatedDomainEvent.fromAggregate(expected)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
