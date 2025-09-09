import { Session } from "@Metrics/Session/domain/Session";
import { SessionRepository } from "@Metrics/Session/domain/SessionRepository";
import { City } from "@Metrics/Session/domain/ValueObjects/City";
import { CommunityId } from "@Metrics/Session/domain/ValueObjects/CommunityId";
import { Country } from "@Metrics/Session/domain/ValueObjects/Country";
import { Id } from "@Metrics/Session/domain/ValueObjects/Id";
import { UserId } from "@Metrics/Session/domain/ValueObjects/UserId";
import { EventBus } from "@Shared/domain/EventBus/EventBus";

export class Creator{
    constructor(private readonly repository: SessionRepository, private readonly eventBus: EventBus){}

    async run(
        id:Id,
        communityId: CommunityId,
        userId: UserId,
        country: Country,
        city: City
    ){
        const existing = await this.repository.find(id)

        if(existing) return

        const session = Session.create(
            id,
            communityId,
            userId,
            country,
            city
        )

        await this.repository.persist(session)
        await this.eventBus.publish(session.pullDomainEvents())
    }
}