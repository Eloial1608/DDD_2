import { EncrypterMock } from '@Tests/Contexts/Auth/Shared/infrastructure/Encrypt/EncrypterMock'
import { AuthUserRepositoryMock } from '../../__mocks__/AuthUserRepositoryMock'
import { OAuthRepositoryMock } from '../../__mocks__/OAuthRepositoryMock'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { Creator } from '@Auth/AuthUser/application/Create/Creator'
import { CreateAuthUserCommandHandler } from '@Auth/AuthUser/application/Create/CreateAuthUserCommandHandler'
import { AuthUserMother } from '../../domain/AuthUserMother'
import { CreateAuthUserCommandMother } from './CreateAuthUserCommandMother'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'
import { AuthUserCreatedDomainEventMother } from '../../domain/AuthUserCreatedDomainEventMother'
import { AuthUserAlreadyExists } from '@Auth/AuthUser/domain/Errors/AuthUserAlreadyExists'
import { Method, ValidMethods } from '@Auth/AuthUser/domain/ValueObjects/Method'
import { InvalidSecret } from '@Auth/AuthUser/domain/Errors/InvalidSecret'

let repository: AuthUserRepositoryMock
let oAuthRepository: OAuthRepositoryMock
let encrypter: EncrypterMock
let eventBus: EventBusMock
let handler: CreateAuthUserCommandHandler

describe('CreateAuthUserCommandHandler should ', () => {
  beforeEach(() => {
    repository = new AuthUserRepositoryMock()
    oAuthRepository = new OAuthRepositoryMock()
    encrypter = new EncrypterMock()
    eventBus = new EventBusMock()
    const creator = new Creator(repository, eventBus, oAuthRepository, encrypter)
    handler = new CreateAuthUserCommandHandler(creator)
  })

  test('Create a new auth user', async () => {
    const authUser = AuthUserMother.random()
    const command = CreateAuthUserCommandMother.fromAggregate(authUser)

    encrypter.returnOnEncrypt('encrypted')

    await handler.handle(command)

    const expectedAuthUser = AuthUserMother.create({
      ...authUser,
      secret: new Secret('encrypted')
    })

    repository.assertPersistHasBeenCalledWith(expectedAuthUser)
  })

  test('Create a new authUserCreatedDomainEvent', async () => {
    const authUser = AuthUserMother.random()
    const command = CreateAuthUserCommandMother.fromAggregate(authUser)

    encrypter.returnOnEncrypt('encrypted')

    await handler.handle(command)

    const expectedAuthUser = AuthUserMother.create({
      ...authUser,
      secret: new Secret('encrypted')
    })

    const expectedEvent = AuthUserCreatedDomainEventMother.create(expectedAuthUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })

  test('Fail if the auth user exists', async () => {
    const authUser = AuthUserMother.random()
    const command = CreateAuthUserCommandMother.fromAggregate(authUser)

    encrypter.returnOnEncrypt('encrypted')

    repository.returnOnSearch([AuthUserMother.random()])

    expect(handler.handle(command)).rejects.toThrow(AuthUserAlreadyExists)
  })

  test('Fail if the auth user method is oauth and it doesnt exists', async () => {
    const authUser = AuthUserMother.create({
      method: new Method(ValidMethods.GOOGLE)
    })
    const command = CreateAuthUserCommandMother.fromAggregate(authUser)

    encrypter.returnOnEncrypt('encrypted')

    oAuthRepository.returnOnGetByUid(null)

    expect(handler.handle(command)).rejects.toThrow(InvalidSecret)
  })
})
