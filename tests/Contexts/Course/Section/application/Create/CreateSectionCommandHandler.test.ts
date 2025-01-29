import EventBusMock from "@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock";
import { SectionRepositoryMock } from "../../__mocks__/SectionRepositoryMock";
import { QueryBusMock } from "@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock";
import { CreateSectionCommandHandler } from "@Course/Section/application/Create/CreateSectionCommandHandler";
import { Creator } from "@Course/Section/application/Create/Creator";
import { SectionMother } from "../../domain/SectionMother";
import { CreateSectionCommandMother } from "./CreateSectionCommandMother";
import { SectionCreatedDomainEvent } from "@Course/Section/domain/events/SectionCreatedDomainEvent";

let eventBus: EventBusMock
let repository: SectionRepositoryMock
let queryBus; QueryBusMock
let handler: CreateSectionCommandHandler
let creator: Creator

describe('CreateSectionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SectionRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository,eventBus, queryBus)
    handler = new CreateSectionCommandHandler(creator)
  })

  test('create a new Section', async () =>{
    const section = SectionMother.random()

    const command = CreateSectionCommandMother.fromAggregate(section)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(section)
  })

  test('Create a new SectionCreateDomainEvent',async () =>{
    const section = SectionMother.random()

    const command = CreateSectionCommandMother.fromAggregate(section)

    await handler.handle(command)

    const expectedEvent = SectionCreatedDomainEvent.fromAggregate(section)

    eventBus.assertEventHasBeenPublished(expectedEvent )
  })
})