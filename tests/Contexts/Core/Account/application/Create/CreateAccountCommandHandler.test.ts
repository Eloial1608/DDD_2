import { CreateAccountCommandHandler } from '@Core/Account/application/Create/CreateAccountCommandHandler'
import { Creator } from '@Core/Account/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { AccountRepositoryMock } from '../../__mocks__/AccountRepositoryMock'
import { AccountMother } from '../../domain/AccountMother'
import { CreateAccountCommandMother } from './CreateAccountCommandMother'
import { AccountAlreadyExists } from '@Core/Account/domain/Errors/AccountAlreadyExists'
import { AccountCreatedDomainEvent } from '@Core/Account/domain/Events/AccountCreatedDomainEvent'

let eventBus: EventBusMock
let repository: AccountRepositoryMock
let handler: CreateAccountCommandHandler
let creator: Creator

describe('CreateAccountCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new AccountRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateAccountCommandHandler(creator)
  })

  test('Create a new account', async () => {
    const account = AccountMother.random()

    const command = CreateAccountCommandMother.fromAggregate(account)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(account)
  })

  test('Fail if a account with the same id already exists', async () => {
    const account = AccountMother.random()
    const existingAccount = AccountMother.create({ id: account.id })

    const command = CreateAccountCommandMother.fromAggregate(account)

    repository.returnOnFind(existingAccount)

    expect(handler.handle(command)).rejects.toThrow(AccountAlreadyExists)
  })

  test('Create a new AccountCreatedDomainEvent', async () => {
    const account = AccountMother.random()

    const command = CreateAccountCommandMother.fromAggregate(account)

    await handler.handle(command)

    const expectedEvent = AccountCreatedDomainEvent.fromAggregate(account)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
