import { AggregateRoot } from '@Shared/domain/AggregateRoot'

export class Metric extends AggregateRoot {
  constructor (
        readonly id: string,
        readonly type: 'button' | 'open',
        readonly date: Date
  ) {
    super()
  }

  static create (
    id: string,
    type: 'button' | 'open',
    date: Date
  ): Metric {
    return new Metric(id, type, date)
  }
}
