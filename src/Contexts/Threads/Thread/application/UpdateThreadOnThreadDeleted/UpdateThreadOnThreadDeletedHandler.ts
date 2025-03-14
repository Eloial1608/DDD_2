import { DomainEventSubscriber } from "@Shared/domain/EventBus/DomainEventSubscriber";
import { ThreadDeletedDomainEvent } from "@Threads/Thread/domain/Events/ThreadDeletedDomainEvent";
import { Updater } from "./Updater";
import { DomainEventClass } from "@Shared/domain/EventBus/DomainEvent";
import { Id } from "@Threads/Thread/domain/ValueObjects/Id";

export class UpdateThreadOnThreadDeletedHandler implements DomainEventSubscriber<ThreadDeletedDomainEvent>{
    constructor (private readonly updater: Updater){}

    subscribedTo(): Array<DomainEventClass> {
        return [ThreadDeletedDomainEvent]
    }

    async on (domainEvent: ThreadDeletedDomainEvent): Promise<void>{
        if(!domainEvent.threadParentId) return
        await this.updater.run(
            new Id(domainEvent.threadParentId)
        )
    }
}