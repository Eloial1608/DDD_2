import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Nullable } from "vitest";

import { Balance } from "./ValueObjects/Balance";
import { CardPin } from "./ValueObjects/CardPin";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { Cvv } from "./ValueObjects/Cvv";
import { DeletedAt } from "./ValueObjects/DeletedAt";
import { Expiration } from "./ValueObjects/Expiration";
import { LimitCard } from "./ValueObjects/LimitCard";
import { NumCard } from "./ValueObjects/NumCard";
import { Type_Card } from "./ValueObjects/Type_Card";
import { UpdatedAt } from "./ValueObjects/UpdatedAt";
import { AccountId } from "./ValueObjects/AccountId";
import { Id } from "./ValueObjects/Id";
import { IsBlocked } from "./ValueObjects/IsBlocked";

export class Card extends AggregateRoot {
  constructor(
    readonly id: Id,
    readonly numCard: NumCard,
    readonly type_Card: Type_Card,
    readonly limitCard: LimitCard,
    readonly balance: Balance,
    readonly expiration: Expiration,
    readonly cardPin: CardPin,
    readonly cvv: Cvv,
    readonly accountId: AccountId,
    readonly isBlocked: IsBlocked,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super();
  }

  static create(
    id: Id,
    numCard: NumCard,
    type_Card: Type_Card,
    balance: Balance,
    expiration: Expiration,
    cardPin: CardPin,
    cvv: Cvv,
    accountId: AccountId,
    limitCard: LimitCard,
    isBlocked: IsBlocked
  ): Card {
    const now = new Date();

    return new Card(
      id,
      numCard,
      type_Card,
      limitCard,
      balance,
      expiration,
      cardPin,
      cvv,
      accountId,
      isBlocked,
      new CreatedAt(now),
      new UpdatedAt(now),
      null
    );
  }

  updateLimit(limit: LimitCard): Card {
    return new Card(
      this.id,
      this.numCard,
      this.type_Card,
      limit,
      this.balance,
      this.expiration,
      this.cardPin,
      this.cvv,
      this.accountId,
      this.isBlocked,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    );
  }

  update(
    balance: Balance,
    limitCard: LimitCard,
    cardPin: CardPin,
    isBlocked: IsBlocked
  ): Card {
    return new Card(
      this.id,
      this.numCard,
      this.type_Card,
      limitCard,
      balance,
      this.expiration,
      cardPin,
      this.cvv,
      this.accountId,
      isBlocked,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    );
  }

  UpdateAccountCardPin(
    cardPin: CardPin
  ): Card {
    return new Card(
      this.id,
      this.numCard,
      this.type_Card,
      this.limitCard,
      this.balance,
      this.expiration,
      cardPin,
      this.cvv,
      this.accountId,
      this.isBlocked,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    );
  }

  UpdateAccountCardBalance(
    balance: Balance
  ): Card {
    return new Card(
      this.id,
      this.numCard,
      this.type_Card,
      this.limitCard,
      balance,
      this.expiration,
      this.cardPin,
      this.cvv,
      this.accountId,
      this.isBlocked,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    );
  }

  UpdateIsBlocked(
    isBlocked: IsBlocked
  ): Card {
    return new Card(
      this.id,
      this.numCard,
      this.type_Card,
      this.limitCard,
      this.balance,
      this.expiration,
      this.cardPin,
      this.cvv,
      this.accountId,
      isBlocked,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    );
  }
  
  delete(): Card {
    return new Card(
      this.id,
      this.numCard,
      this.type_Card,
      this.limitCard,
      this.balance,
      this.expiration,
      this.cardPin,
      this.cvv,
      this.accountId,
      this.isBlocked,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    );
  }
}