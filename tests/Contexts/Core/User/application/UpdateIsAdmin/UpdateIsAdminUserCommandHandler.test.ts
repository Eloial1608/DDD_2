import { UpdateIsAdminCommandHandler } from "@Core/User/application/UpdateIsAdmin/UpdateIsAdminUserCommandHandler";
import { UpdaterIsAdmin } from "@Core/User/application/UpdateIsAdmin/UpdaterIsAdmin";
import EventBusMock from "@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import { UserMother } from "../../domain/UserMother";
import { UpdateIsAdminUserCommandMother } from "./UpdateIsAdminUserCommandMother";
import { UserUpdatedIsAdminDomainEvent } from "@Core/User/domain/Events/UserUpdatedIsAdminEvent";
import { UserNotFound } from "@Core/User/domain/Errors/UserNotFound";
import { IsAdmin } from "@Core/User/domain/ValueObjects/IsAdmin";


let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: UpdateIsAdminCommandHandler
let updater: UpdaterIsAdmin


describe('UpdateIsAdminUserCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    updater = new UpdaterIsAdmin(repository, eventBus)
    handler = new UpdateIsAdminCommandHandler(updater)
  })

  test('update IsAdmin value',async ()=>{
    const user = UserMother.random()
    const existignUser = UserMother.create({ 
      ...user,   
        isAdmin: new IsAdmin(true),
    })
    repository.returnOnFind(existignUser)

    const command = UpdateIsAdminUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(user)
  })

  test('fail if a user dosent exists',async () =>{
    const user = UserMother.random()
    const command = UpdateIsAdminUserCommandMother.fromAggregate(user)

    expect(handler.handle(command)).rejects.toThrow(UserNotFound)
  })

  test('update a new UserUpdatedIsAdminDomainEvent', async () =>{
    const user = UserMother.random()
    const existignUser = UserMother.create({
      ...user,   
        isAdmin: new IsAdmin(true),
    })

    repository.returnOnFind(existignUser)

    const command = UpdateIsAdminUserCommandMother.fromAggregate(user)

    await handler.handle(command)
    
    const expectedEvent = UserUpdatedIsAdminDomainEvent.fromAggregate(user)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })


})