import '@Apps/Core/env/loadEnv'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { test, expect } from '@playwright/test'
import { UserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'

let arragner: EnvironmentArranger
let repository: UserRepository

test.beforeAll(async () =>{
    await DI.getInstance().initialize()
    arragner = await DI.getInstance().resolve<EnvironmentArranger>('Core.EnviormentArranger')
    repository = await DI.getInstance().resolve<UserRepository>('User.Repository')
    await arragner.arrange()
})

test('PATCH UserIsAdmin', async ({request}) =>{
    const user = UserMother.random()
    

    const r = await request.patch(`/v1/users/${user.id.valueOf()}`,{
        data:{
            isAdmin: user.isAdmin.valueOf(),
            communityId: user.communityId.valueOf()
        }
            
    }) 

    expect(r.status()).toEqual(201)
})

test('PATCH userIsAdmin without admin privilegies', async ({request}) =>{

})