import { Card } from '../domain/Card'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { CardResponseBody, CardResponse } from './CardResponse'

export class CardCollectionResponse implements QueryResponse<Array<CardResponseBody>> {
  response: Array<CardResponseBody>

  constructor (cards: Array<Card>) {
    this.response = cards.map(x => new CardResponse(x).response)
  }
}
