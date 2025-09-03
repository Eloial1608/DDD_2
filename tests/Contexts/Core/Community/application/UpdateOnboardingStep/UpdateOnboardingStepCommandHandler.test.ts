import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '../../domain/CommunityMother'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { UpdateOnboardingStepCommandMother } from './UpdateOnboardingStepCommandMother'
import { Updater } from '@Core/Community/application/UpdateOnboardingStep/Updater'
import { UpdateOnboardingStepCommandHandler } from '@Core/Community/application/UpdateOnboardingStep/UpdateOnboardingStepCommandHandler'
import { InvalidOnboardingStep } from '@Core/Community/domain/Errors/InvalidOnboardingStep'
import { CommunityOnboardingStepUpdatedDomainEvent } from '@Core/Community/domain/Events/CommunityOnboardingStepUpdatedDomainEvent'
import { ONBOARDING_STEPS, OnboardingStep } from '@Core/Community/domain/ValueObjects/OnboardingStep'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: UpdateOnboardingStepCommandHandler
let updater: Updater

describe('UpdateOnboardingStepCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateOnboardingStepCommandHandler(updater)
  })

  test('Update a community\'s onboarding step', async () => {
    const existingCommunity = CommunityMother.random()
    const community = CommunityMother.create({
      ...existingCommunity,
      onboardingStep: new OnboardingStep(ONBOARDING_STEPS.TEMPLATE)
    })

    const command = UpdateOnboardingStepCommandMother.updateOnboardingStep(community.id.valueOf(), 'template')

    repository.returnOnFind(community)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(community)
  })

  test('Fail if the onboarding step is invalid', async () => {
    const community = CommunityMother.random()

    const command = UpdateOnboardingStepCommandMother.updateOnboardingStep(community.id.valueOf(), 'invalid')

    repository.returnOnFind(community)

    expect(handler.handle(command)).rejects.toThrow(InvalidOnboardingStep)
  })

  test('Fail if a community doesnt exists', async () => {
    const community = CommunityMother.random()

    const command = UpdateOnboardingStepCommandMother.fromAggregate(community)

    expect(handler.handle(command)).rejects.toThrow(CommunityNotFound)
  })

  test('Create a new CommunityUpdatedDomainEvent', async () => {
    const community = CommunityMother.random()

    const command = UpdateOnboardingStepCommandMother.updateOnboardingStep(community.id.valueOf(), 'template')

    repository.returnOnFind(community)

    await handler.handle(command)

    const expectedEvent = CommunityOnboardingStepUpdatedDomainEvent.fromAggregate(community)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
