import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Project } from '../Project'

type ProjectUpdatedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly spaceId: string
}

export class ProjectUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Project.project.v1.updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly spaceId: string

  static {
    DomainEvent.derived.add(ProjectUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ProjectUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ProjectUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.spaceId = params.spaceId
  }

  static fromAggregate (project: Project): ProjectUpdatedDomainEvent {
    return new ProjectUpdatedDomainEvent({
      id: project.id.valueOf(),
      communityId: project.communityId.valueOf(),
      userId: project.userId.valueOf(),
      spaceId: project.spaceId.valueOf()
    })
  }

  toPrimitive (): ProjectUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ProjectUpdatedDomainEventBody, eventId: string, occurredOn: Date): ProjectUpdatedDomainEvent {
    return new ProjectUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
