import { Id } from '@Core/Account/domain/ValueObjects/Id'
import { Name } from '@Core/Account/domain/ValueObjects/Name'
import { AccountRepository } from '@Core/Account/domain/AccountRepository'
import { Account } from '@Core/Account/domain/Account'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Email } from '@Core/Account/domain/ValueObjects/Email'
import { AccountAlreadyExists } from '@Core/Account/domain/Errors/AccountAlreadyExists'

type Params = {
    id: Id
    name: Name
    email: Email
}

export class Creator {
  constructor (private readonly repository: AccountRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    const existingAccount = await this.repository.find(params.id)

    if (existingAccount) throw new AccountAlreadyExists(params.id)

    const account = Account.create(
      params.id,
      params.name,
      params.email,
      null
    )

    await this.repository.persist(account)

    await this.eventBus.publish(account.pullDomainEvents())
  }
}
