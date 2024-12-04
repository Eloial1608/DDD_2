import { Account } from '@Core/Account/domain/Account'
import { CreatedAt } from '@Core/Account/domain/ValueObjects/CreatedAt'
import { Id } from '@Core/Account/domain/ValueObjects/Id'
import { Name } from '@Core/Account/domain/ValueObjects/Name'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'
import { Email } from '@Core/Account/domain/ValueObjects/Email'

export class AccountMother {
  static create (params: Partial<Account>): Account {
    return new Account(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.email ?? new Email(MotherCreator.random().internet.email()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): Account {
    return this.create({})
  }
}
