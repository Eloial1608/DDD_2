import { Query } from '@Shared/domain/QueryBus/Query'

export class FindUserByPhoneNumberQuery implements Query {
  constructor (
    readonly phoneNumber: string
  ) {}
}