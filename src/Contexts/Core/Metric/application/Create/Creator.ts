import { MetricRepository } from '@Core/Metric/domain/MetricRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Metric } from '@Core/Metric/domain/Metric'

type Params = {
    id: string,
    type: 'button' | 'open',
    date: Date
}

export class Creator {
  constructor (private readonly repository: MetricRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    const metric = Metric.create(
      params.id,
      params.type,
      params.date
    )

    await this.repository.persist(metric)

    await this.eventBus.publish(metric.pullDomainEvents())
  }
}
