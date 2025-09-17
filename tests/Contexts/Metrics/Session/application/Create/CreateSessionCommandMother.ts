import { CreateSessionCommand } from '@Metrics/Session/application/Create/CreateSessionCommand'
import { Session } from '@Metrics/Session/domain/Session'

export class CreateSessionCommandMother {
  static create (
    id: string,
    communityId: string,
    userId: string,
    country: string,
    city: string): CreateSessionCommand {
    return new CreateSessionCommand(
      id,
      communityId,
      userId,
      country,
      city
    )
  }

  static fromAggregate (session: Session): CreateSessionCommand {
    return this.create(
      session.id.valueOf(),
      session.communityId.valueOf(),
      session.userId.valueOf(),
      session.country.valueOf(),
      session.city.valueOf()
    )
  }
}
