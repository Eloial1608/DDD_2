import EventBusMock from "@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock"
import { QueryBusMock } from "@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock"
import { TypeRepositoryMock } from "../../__mocks__/TypeRepositoryMock"
import { CreateTypeCommandHandler } from "@Projects/Type/application/Create/CreateTypeCommandHandler"
import { Creator } from "@Projects/Type/application/Create/Creator"
import { TypeMother } from "../../domain/TypeMother"
import { ProjectMother } from "@Tests/Contexts/Projects/Project/domain/ProjectMother"
import { FindProjectByIdQuery } from "@Projects/Project/application/FindById/FindProjectByIdQuery"
import { CreateTypeCommandMother } from "./CreateTypeCommandMother"
import { TypeCreatedDomainEvent } from "@Projects/Type/domain/Events/TypeCreatedDomainEvent"

let eventBus : EventBusMock
let queryBus: QueryBusMock
let repository: TypeRepositoryMock
let handler: CreateTypeCommandHandler
let creator : Creator

describe('CreateTypeCommandHandler should' ,() =>{
    beforeEach(()=>{
        eventBus = new EventBusMock()
        queryBus = new QueryBusMock()
        repository = new TypeRepositoryMock()
        creator = new Creator(repository, queryBus, eventBus)
        handler = new CreateTypeCommandHandler(creator)
    })

    test(' Create a new Type with projectId', async () =>{
        const project = ProjectMother.random()
        
        const type = TypeMother.create({projectId: project.id})

        queryBus.returnOnQuery(new FindProjectByIdQuery(project.id.valueOf()), { response: project })

        const command = CreateTypeCommandMother.fromAggregate(type)

        await handler.handle(command)

        repository.assertPersistHasBeenCalledWith(type)
    })
        test(' Create a new Type without projectId', async () =>{
        
        const type = TypeMother.random()

        const command = CreateTypeCommandMother.fromAggregate(type)

        await handler.handle(command)

        repository.assertPersistHasBeenCalledWith(type)
    })

    test('Create a new ProjectCreateDomainEvent', async() => {
        const type = TypeMother.random()

        const command = CreateTypeCommandMother.fromAggregate(type)

        await handler.handle(command)

         const expectedEvent = TypeCreatedDomainEvent.fromAggregate(type)

        eventBus.assertEventHasBeenPublished(expectedEvent)
    })
})
