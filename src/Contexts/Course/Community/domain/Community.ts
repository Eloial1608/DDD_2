import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { IsPrivate } from './ValueObjects/IsPrivate'

export class Community extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly isPrivate: IsPrivate
  ) {
    super()
  }
}