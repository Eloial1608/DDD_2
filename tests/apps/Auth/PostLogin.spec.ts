import '@Apps/Auth/env/loadEnv'
import DI from '@Apps/Auth/dependencyInjection/DI'
import { test, expect } from '@playwright/test'
import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'
import { AuthUserMother } from '@Tests/Contexts/Auth/AuthUser/domain/AuthUserMother'
import { AuthUserRepository } from '@Auth/AuthUser/domain/AuthUserRepository'
import { Encrypter } from '@Auth/Shared/domain/Encrypt/Encrypter'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'
import { Method, ValidMethods } from '@Auth/AuthUser/domain/ValueObjects/Method'

let arranger: EnvironmentArranger
let repository: AuthUserRepository
let encrypter: Encrypter

test.beforeAll(async () => {
  await DI.getInstance().initialize()
  arranger = await DI.getInstance().resolve<EnvironmentArranger>('Auth.EnvironmentArranger')
  repository = await DI.getInstance().resolve<AuthUserRepository>('AuthUser.Repository')
  encrypter = await DI.getInstance().resolve<Encrypter>('Auth.Encrypter')
  await arranger.arrange()
})

test('POST login should return a token', async ({ request }) => {
  const authUser = AuthUserMother.create({
    method: new Method(ValidMethods.PASSWORD),
    secret: new Secret(encrypter.encrypt('password1234'))
  })

  await repository.persist(authUser)

  const r = await request.post('/v1/auth/login', {
    data: {
      email: authUser.email.valueOf(),
      communityId: authUser.communityId.valueOf(),
      secret: 'password1234',
      method: authUser.method.valueOf()
    }
  })

  expect(r.ok()).toBeTruthy()
})
