import EventBusMock from "@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock"
import { ThreadRepositoryMock } from "../../__mocks__/ThreadRepositoryMock"
import { DeleteThreadCommandHandler } from "@Threads/Thread/application/Delete/DeleteThreadCommandHandler"
import { Deleter } from "@Threads/Thread/application/Delete/Deleter"
import { ThreadMother } from "../../domain/ThreadMother"
import { DeletedAt } from "@Threads/Thread/domain/ValueObjects/DeletedAt"
import { DeleteThreadCommandMother } from "./DeleteThreadCommandMother"
import { ThreadDeletedDomainEvent } from "@Threads/Thread/domain/Events/ThreadDeletedDomainEvent"

let eventBus: EventBusMock
let repository: ThreadRepositoryMock
let handler: DeleteThreadCommandHandler
let deleter: Deleter

describe('DeleteThreadCommandHandler should', ()=>{
    beforeEach(()=>{
        eventBus = new EventBusMock()
        repository = new ThreadRepositoryMock()
        deleter = new Deleter(repository, eventBus)
        handler = new DeleteThreadCommandHandler(deleter)
    })

    test(' Delete a Thread', async ()=>{
        const thread = ThreadMother.create({deletedAt: new DeletedAt(new Date())})

        const existing = ThreadMother.create({...thread, deletedAt: undefined})

        repository.returnOnFind(existing)

        const command = DeleteThreadCommandMother.fromAggregate(thread)

        await handler.handle(command)

        repository.assertPersistHasBeenCalledWith(thread)
    })

    test('Create a new ThreadDeleteDomainEvent', async () =>{
        const thread = ThreadMother.create({deletedAt: new DeletedAt(new Date())})

        const existing = ThreadMother.create({...thread, deletedAt: undefined})

        repository.returnOnFind(existing)

        const command = DeleteThreadCommandMother.fromAggregate(thread)

        await handler.handle(command)

        const expectedEvent = ThreadDeletedDomainEvent.fromAggregate(thread)
        
        eventBus.assertEventHasBeenPublished(expectedEvent)
    })
})