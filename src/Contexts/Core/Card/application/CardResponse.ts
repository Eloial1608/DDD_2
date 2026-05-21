import { Card } from '../domain/Card';
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse';
import { CardTypeEnum } from '../domain/ValueObjects/Type_Card';

export type CardResponseBody = {
  readonly id: string;
  readonly accountId: string;
  readonly numCard: string;
  readonly type_Card: CardTypeEnum;

  readonly limitCard: number;
  readonly balance: number;

  readonly expiration: Date;
  readonly cvv: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};

export class CardResponse implements QueryResponse<CardResponseBody> {

  response: CardResponseBody;

  constructor(card: Card) {
    this.response = CardResponse.toBody(card);
  }

  static toBody(card: Card): CardResponseBody {
    return {
      id: card.id.valueOf(),
      accountId: card.accountId.valueOf(),
      numCard: card.numCard.valueOf(),

      type_Card: card.type_Card.valueOf(),

      limitCard: card.limitCard.valueOf(),
      balance: card.balance.valueOf(),

      expiration: card.expiration.valueOf(),
      cvv: card.cvv.valueOf(),

      createdAt: card.createdAt.valueOf(),
      updatedAt: card.updatedAt.valueOf(),

      deletedAt: card.deletedAt
        ? card.deletedAt.valueOf()
        : null
    };
  }

  static from(card: Card): CardResponse {
    return new CardResponse(card);
  }
}