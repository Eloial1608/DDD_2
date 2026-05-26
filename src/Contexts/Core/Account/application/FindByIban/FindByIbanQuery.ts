import { Query } from '@Shared/domain/QueryBus/Query'

export class FindByIbanQuery implements Query {
  constructor (
    readonly iban: string
  ) {}
}