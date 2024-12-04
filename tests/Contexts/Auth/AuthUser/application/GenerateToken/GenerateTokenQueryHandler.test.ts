import { EncrypterMock } from '@Tests/Contexts/Auth/Shared/infrastructure/Encrypt/EncrypterMock'
import { AuthUserRepositoryMock } from '../../__mocks__/AuthUserRepositoryMock'
import { Generator } from '@Auth/AuthUser/application/GenerateToken/Generator'
import { GenerateTokenQueryHandler } from '@Auth/AuthUser/application/GenerateToken/GenerateTokenQueryHandler'
import { AuthUserMother } from '../../domain/AuthUserMother'
import { GenerateTokenQueryMother } from './GenerateTokenQueryMother'
import { JwtTokenizerMock } from '@Tests/Contexts/Auth/Shared/infrastructure/Tokenizer/JwtTokenizerMock'
import { GenerateTokenResponse } from '@Auth/AuthUser/application/GenerateToken/GenerateTokenResponse'
import { AuthUserNotFound } from '@Auth/AuthUser/domain/Errors/AuthUserNotFound'

let repository: AuthUserRepositoryMock
let encrypter: EncrypterMock
let tokenizer: JwtTokenizerMock
let handler: GenerateTokenQueryHandler

describe('GenerateTokenQueryHandler should ', () => {
  beforeEach(() => {
    repository = new AuthUserRepositoryMock()
    encrypter = new EncrypterMock()
    tokenizer = new JwtTokenizerMock()
    const generator = new Generator(repository, tokenizer, encrypter)
    handler = new GenerateTokenQueryHandler(generator)
  })

  test('Generate a token', async () => {
    const authUser = AuthUserMother.random()
    const query = GenerateTokenQueryMother.fromAggregate(authUser)

    encrypter.returnOnEncrypt('encrypted')

    repository.returnOnFindByCommunityMethodAndSecret(authUser)

    const response = await handler.handle(query)

    expect(response).toEqual(new GenerateTokenResponse('token'))
    tokenizer.assertTokenizerHasBeenCalledWith({
      id: authUser.userId.valueOf(),
      communityId: authUser.communityId.valueOf()
    }, 15552000)
  })

  test('Fail if the auth user doesnt exists', async () => {
    const authUser = AuthUserMother.random()
    const query = GenerateTokenQueryMother.fromAggregate(authUser)

    encrypter.returnOnEncrypt('encrypted')

    expect(handler.handle(query)).rejects.toThrow(AuthUserNotFound)
  })
})
