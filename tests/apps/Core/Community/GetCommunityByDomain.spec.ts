import '@Apps/Core/env/loadEnv'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { test, expect } from '@playwright/test'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'
import { Domain } from '@Core/Community/domain/ValueObjects/Domain'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

let arranger: EnvironmentArranger
let repository: CommunityRepository

test.beforeAll(async () => {
  await DI.getInstance().initialize()
  arranger = await DI.getInstance().resolve<EnvironmentArranger>('Core.EnvironmentArranger')
  repository = await DI.getInstance().resolve<CommunityRepository>('Community.Repository')
  await arranger.arrange()
})

test('GET Community by Domain should return a community', async ({ request }) => {
  const community = CommunityMother.create({
    domain: new Domain(WordMother.random())
  })
  await repository.persist(community)

  const r = await request.get(`/v1/communities/domain/${community.domain?.valueOf()}`)

  expect(r.status()).toEqual(200)
})
