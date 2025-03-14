import { DomainEventSubscriber } from "@Shared/domain/EventBus/DomainEventSubscriber";
import { ThreadCreatedDomainEvent } from "@Threads/Thread/domain/Events/ThreadCreatedDomainEvent";
import { Updater } from "./Updater";
import { DomainEventClass } from "@Shared/domain/EventBus/DomainEvent";
import { Id } from "@Threads/Thread/domain/ValueObjects/Id";

export class UpdateThreadOnThreadCreatedHandler implements DomainEventSubscriber<ThreadCreatedDomainEvent>{
    constructor (private readonly updater: Updater){}

    subscribedTo(): Array<DomainEventClass> {
        return [ThreadCreatedDomainEvent]
    }

    async on (domainEvent: ThreadCreatedDomainEvent): Promise<void>{
        if(!domainEvent.threadParentId) return
        await this.updater.run(
            new Id(domainEvent.threadParentId)
        )
    }
}