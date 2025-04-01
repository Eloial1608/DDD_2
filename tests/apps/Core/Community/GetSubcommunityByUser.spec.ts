import '@Apps/Core/env/loadEnv'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { test, expect } from '@playwright/test'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { UserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { MainId } from '../../../../src/Contexts/Course/User/domain/ValueObjects/MainId'
import { IsAdmin } from '../../../../src/Contexts/Course/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Core/User/domain/ValueObjects/IsOwner'

let arranger: EnvironmentArranger
let repository: CommunityRepository
let userRepository: UserRepository

test.beforeAll(async () => {
  await DI.getInstance().initialize()
  arranger = await DI.getInstance().resolve<EnvironmentArranger>('Core.EnvironmentArranger')
  repository = await DI.getInstance().resolve<CommunityRepository>('Community.Repository')
  userRepository = await DI.getInstance().resolve<UserRepository>('User.Repository')
  await arranger.arrange()
})

test('GET Subcommunities By User should return the subcommunities a user Has Access', async ({ request }) => {
  const community = CommunityMother.create({})

  await repository.persist(community)

  const subcommunity1 = CommunityMother.create({
    parentId: community.id
  })

  const subcommunity2 = CommunityMother.create({
    parentId: community.id
  })

  await repository.persist(subcommunity1)
  await repository.persist(subcommunity2)

  const user1 = UserMother.create({
    mainId: new MainId(WordMother.random()),
    communityId: community.id,
    isAdmin: new IsAdmin(false),
    isOwner: new IsOwner(false)
  })
  const user2 = UserMother.create({
    mainId: new MainId(WordMother.random()),
    communityId: subcommunity1.id,
    isAdmin: new IsAdmin(false),
    isOwner: new IsOwner(false)
  })

  await userRepository.persist(user1)
  await userRepository.persist(user2)

  const r = await request.get(`/v1/communities/sub/user/communityId/${community.id?.valueOf()}`)

  expect(r.status()).toEqual(200)
})
