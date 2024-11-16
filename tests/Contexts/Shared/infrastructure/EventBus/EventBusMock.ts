import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { DomainEventMapping } from '@Shared/infrastructure/EventBus/DomainEventMapping'
import { mockFn } from '@Tests/Contexts/mockUtils'

export default class EventBusMock implements EventBus {
  private publishSpy = mockFn()

  async publish (events: DomainEvent[]) {
    this.publishSpy(events)
  }

  async start (): Promise<void> {}
  async startPublisher (): Promise<void> {}

  addSubscribers (subscribers: DomainEventSubscriber<DomainEvent>[]): void {}

  setDomainEventMapping (domainEventMapping: DomainEventMapping): void {}

  assertLastPublishedEventIs (expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls

    expect(publishSpyCalls.length).toBeGreaterThan(0)

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]
    const lastPublishedEvent = lastPublishSpyCall[0][0]

    expect(this.getDataFromDomainEvent(expectedEvent)).toMatchObject(this.getDataFromDomainEvent(lastPublishedEvent))
  }

  assertEventHasBeenPublished<E extends DomainEvent> (expectedEvent: E) {
    const publishSpyCalls = this.publishSpy.mock.calls

    expect(publishSpyCalls.length).toBeGreaterThan(0)

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]
    const call = lastPublishSpyCall[0].find(function (event: E) {
      return event.eventName === expectedEvent.eventName
    })

    expect(call).toBeDefined()

    expect(this.getDataFromDomainEvent(expectedEvent)).toMatchObject(this.getDataFromDomainEvent(call))
  }

  assertPublishHasBeenCalledWith<E extends DomainEvent> (expected: E) {
    const allPublishedEvents = this.publishSpy.mock.calls.map(c => this.getDataFromDomainEvent(c[0][0]))
    expect(allPublishedEvents).toContainEqual(this.getDataFromDomainEvent(expected))
  }

  assertNonEventHasBeenPublished () {
    expect(this.publishSpy.mock.calls.length).toBe(0)
  }

  private getDataFromDomainEvent (event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event

    return attributes
  }

  assertPublishHasNotBeenCalled (): void {
    expect(this.publishSpy).not.toHaveBeenCalled()
  }
}
