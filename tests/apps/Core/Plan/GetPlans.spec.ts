import '@Apps/Core/env/loadEnv'
import DI from '@Apps/Core/dependencyInjection/DI'
import { PlanRepository } from '@Core/Plan/domain/PlanRepository'
import { test, expect } from '@playwright/test'
import { PlanMother } from '@Tests/Contexts/Core/Plan/domain/PlanMother'
import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'

let arranger: EnvironmentArranger
let repository: PlanRepository

test.beforeAll(async () => {
  await DI.getInstance().initialize()
  arranger = await DI.getInstance().resolve<EnvironmentArranger>('Core.EnvironmentArranger')
  repository = await DI.getInstance().resolve<PlanRepository>('Plan.Repository')
  await arranger.arrange()
})

test.afterAll(async () => {
  await arranger.close()
})

test('GET Plans should return a plans collection', async ({ request }) => {
  const plans = [PlanMother.random(), PlanMother.random()]

  for (const plan of plans) {
    await repository.persist(plan)
  }

  const r = await request.get('/v1/plans')

  expect(r.ok()).toBeTruthy()
})
