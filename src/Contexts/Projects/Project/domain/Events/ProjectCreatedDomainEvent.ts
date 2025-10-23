import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Project } from '../Project'

type ProjectCreatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly spaceId: string
}

export class ProjectCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Project.project.v1.created'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly spaceId: string

  static {
    DomainEvent.derived.add(ProjectCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ProjectCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ProjectCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.spaceId = params.spaceId
  }

  static fromAggregate (project: Project): ProjectCreatedDomainEvent {
    return new ProjectCreatedDomainEvent({
      id: project.id.valueOf(),
      communityId: project.communityId.valueOf(),
      userId: project.userId.valueOf(),
      spaceId: project.spaceId.valueOf()
    })
  }

  toPrimitive (): ProjectCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ProjectCreatedDomainEventBody, eventId: string, occurredOn: Date): ProjectCreatedDomainEvent {
    return new ProjectCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
