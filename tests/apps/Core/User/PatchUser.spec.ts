import '@Apps/Core/env/loadEnv'
import DI from '@Apps/Core/dependencyInjection/DI'
import { test, expect } from '@playwright/test'
import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { UserMother } from '@Tests/Contexts/Core/User/domain/UserMother'

let arranger: EnvironmentArranger
let repository: UserRepository

test.beforeAll(async () => {
  await DI.getInstance().initialize()
  arranger = await DI.getInstance().resolve<EnvironmentArranger>('Core.EnvironmentArranger')
  repository = await DI.getInstance().resolve<UserRepository>('User.Repository')
  await arranger.arrange()
})

test('PATCH User should return ok response', async ({ request }) => {
  const user = UserMother.random()

  await repository.persist(user)

  const r = await request.patch(`/v1/user/${user.id.valueOf()}`, {
    data: {
      about: user.about?.valueOf(),
      name: user.name.valueOf()
    }
  })

  expect(r.ok()).toBeTruthy()
})
