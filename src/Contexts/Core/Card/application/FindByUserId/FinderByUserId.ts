import { Card } from "@Core/Card/domain/Card"
import { CardRepository } from "@Core/Card/domain/CardRepository"
import { AccountRepository } from "@Core/Account/domain/AccountRepository"
import { Criteria } from "@Shared/domain/Criteria/Criteria"
import { Filters } from "@Shared/domain/Criteria/Filters"
import { Filter } from "@Shared/domain/Criteria/Filter"
import { InFilters } from "@Shared/domain/Criteria/InFilters"
import { UserId } from "@Core/Account/domain/ValueObjects/UserId"

export class FinderByUserId {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async find(userId: UserId): Promise<Array<Card>> {
    const criteria = new Criteria(
      new Filters([
        Filter.simple("userId", "=", userId.valueOf())
      ])
    )
    const accounts = await this.accountRepository.search(criteria)

    if (accounts.length === 0) {
      return []
    }

    const accountIds = accounts.map(account => account.id.valueOf())
    const cardsCriteria = new Criteria(
      undefined,
      InFilters.fromPrimitives([
        {
          field: "accountId",
          operator: "IN",
          values: accountIds
        }
      ])
    )

    return await this.cardRepository.search(cardsCriteria)
  }
}
