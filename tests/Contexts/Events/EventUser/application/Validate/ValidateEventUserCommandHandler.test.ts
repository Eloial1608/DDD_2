import { ValidateEventUserCommandHandler } from '@Events/EventUser/application/Validate/ValidateEventUserCommandHandler'
import { Validator } from '@Events/EventUser/application/Validate/Validator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { EventUserRepositoryMock } from '../../__mocks__/EventUserRepositoryMock'
import { EventUserMother } from '../../domain/EventUserMother'
import { ValidateEventUserCommandMother } from './ValidateEventUserCommandMother'
import { EventUserValidatedDomainEvent } from '@Events/EventUser/domain/Events/EventUserValidatedDomainEvent'
import { ValidatedAt } from '@Events/EventUser/domain/ValueObjects/ValidatedAt'
import { EventUserNotFound } from '@Events/EventUser/domain/Errors/EventUserNotFound'
let eventBus: EventBusMock
let repository: EventUserRepositoryMock
let handler: ValidateEventUserCommandHandler
let validator: Validator

describe('ValidateEventUserCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new EventUserRepositoryMock()
    validator = new Validator(repository, eventBus)
    handler = new ValidateEventUserCommandHandler(validator)
  })

  test('Validate a new eventuser', async () => {
    const eventuser = EventUserMother.random()

    const command = ValidateEventUserCommandMother.fromAggregate(eventuser)

    repository.returnOnFind(eventuser)

    await handler.handle(command)

    const expected = EventUserMother.create({
      ...eventuser,
      validatedAt: new ValidatedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expected)
  })

  test('Fail if it doesnt exists', async () => {
    const eventuser = EventUserMother.random()

    const command = ValidateEventUserCommandMother.fromAggregate(eventuser)

    expect(handler.handle(command)).rejects.toThrow(EventUserNotFound)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Validate a new EventUserValidatedDomainEvent', async () => {
    const eventuser = EventUserMother.random()

    const command = ValidateEventUserCommandMother.fromAggregate(eventuser)

    repository.returnOnFind(eventuser)

    await handler.handle(command)

    const expected = EventUserMother.create({
      ...eventuser,
      validatedAt: new ValidatedAt(new Date())
    })

    const expectedEventUser = EventUserValidatedDomainEvent.fromAggregate(expected)

    eventBus.assertEventHasBeenPublished(expectedEventUser)
  })
})
