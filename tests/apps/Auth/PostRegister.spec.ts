import '@Apps/Auth/env/loadEnv'
import DI from '@Apps/Auth/dependencyInjection/DI'
import { test, expect } from '@playwright/test'
import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'
import { AuthUserMother } from '@Tests/Contexts/Auth/AuthUser/domain/AuthUserMother'
import { AuthUserRepository } from '@Auth/AuthUser/domain/AuthUserRepository'
import { Encrypter } from '@Auth/Shared/domain/Encrypt/Encrypter'
import { v4 } from 'uuid'

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

test('POST register should return a token', async ({ request }) => {
  const authUser = AuthUserMother.random()

  const r = await request.post(`/v1/auth/register/${v4()}`, {
    data: {
      email: authUser.email.valueOf(),
      communityId: authUser.communityId.valueOf(),
      secret: 'password1234',
      method: authUser.method.valueOf()
    }
  })

  expect(r.ok()).toBeTruthy()
})
