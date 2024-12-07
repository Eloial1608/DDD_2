import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from '@Core/Account/domain/ValueObjects/Id'
import { Name } from '@Core/Account/domain/ValueObjects/Name'
import { Email } from '@Core/Account/domain/ValueObjects/Email'
import { CreatedAt } from '@Core/Account/domain/ValueObjects/CreatedAt'
import { MethodId } from './ValueObjects/MethodId'
import { Nullable } from '@Shared/domain/Nullable'
import { AccountCreatedDomainEvent } from './Events/AccountCreatedDomainEvent'

export class Account extends AggregateRoot {
  constructor (
        readonly id : Id,
        readonly name : Name,
        readonly email : Email,
        readonly createdAt : CreatedAt,
        readonly methodId : Nullable<MethodId>
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    email: Email,
    methodId: Nullable<MethodId>
  ) {
    const account = new Account(
      id,
      name,
      email,
      new CreatedAt(new Date()),
      methodId
    )

    account.record(AccountCreatedDomainEvent.fromAggregate(account))

    return account
  }
}
