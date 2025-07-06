import EventBusMock from "@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock";
import { QueryBusMock } from "@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock";
import { ProjectRepositoryMock } from "../../__mocks__/ProjectRepositoryMock";
import { CreateProjectCommandHandler } from "@Projects/Project/application/Create/CreateProjectCommandHandler";
import { Creator } from "@Projects/Project/application/Create/Creator";
import { ProjectMother } from "../../domain/ProjectMother";
import { SpaceMother } from "@Tests/Contexts/Projects/Space/domain/SpaceMother";
import { FindSpaceByIdQuery } from "@Projects/Space/application/FindById/FindSpaceByIdQuery";
import { SpaceResponse } from "@Projects/Space/application/SpaceResponse";
import { CreateProjectCommandMother } from "./CreateProjectCommandMother";
import { ProjectCreatedDomainEvent } from "@Projects/Project/domain/Events/ProjectCreatedDomainEvent";
import { FindUsersByCriteriaQuery } from "@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery";
import { UserCollectionResponse } from "@Projects/User/application/UserCollectionResponse";
import { UserMother } from "@Tests/Contexts/Projects/User/domain/UserMother";

let eventBus : EventBusMock
let queryBus: QueryBusMock
let repository: ProjectRepositoryMock
let handler: CreateProjectCommandHandler
let creator : Creator

describe('CreateProjectCommandHandler should' ,() =>{
    beforeEach(()=>{
        eventBus = new EventBusMock()
        queryBus = new QueryBusMock()
        repository = new ProjectRepositoryMock()
        creator = new Creator(repository, eventBus, queryBus)
        handler = new CreateProjectCommandHandler(creator)
    })

    test(' Create a new Project', async () =>{

        const user = UserMother.random()

        const project = ProjectMother.create({userId: user.id})

        const space = SpaceMother.create({communityId : project.communityId})

        queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
        queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))
    
        const command = CreateProjectCommandMother.fromAggregate(project)

        await handler.handle(command)

        repository.assertPersistHasBeenCalledWith(project)
    })

    test('Create a new ProjectCreateDomainEvent', async() => {
        const user = UserMother.random()
        
        const project = ProjectMother.create({userId: user.id})

        const space = SpaceMother.create({communityId : project.communityId})

        queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
        queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))
    
        const command = CreateProjectCommandMother.fromAggregate(project)

        await handler.handle(command)

        const expectedEvent = ProjectCreatedDomainEvent.fromAggregate(project)

        eventBus.assertEventHasBeenPublished(expectedEvent)
    })
})