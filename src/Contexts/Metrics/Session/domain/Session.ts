import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CommunityId } from './ValueObjects/CommunityId'
import { UserId } from './ValueObjects/UserId'
import { Country } from './ValueObjects/Country'
import { City } from './ValueObjects/City'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { SessionCreatedDomainEvent } from './Events/CreatedSessionDomainEvent'

export class Session extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly userId: UserId,
        readonly country: Country,
        readonly city: City,
        readonly createdAt: CreatedAt) {
    super()
  }

  static create (id:Id, communityId:CommunityId, userId:UserId, country:Country, city:City): Session {
    const session = new Session(id, communityId, userId, country, city,new CreatedAt(new Date()))
     
    session.record(SessionCreatedDomainEvent.fromAggregate(session))
    
    return session
  }
}
