import { Title } from '../domain/Title'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { TitleResponse, TitleResponseBody } from './TitleResponse'

export class TitleCollectionResponse implements QueryResponse<Array<TitleResponseBody>> {
  response: Array<TitleResponseBody>

  constructor (title: Array<Title>) {
    this.response = title.map(x => new TitleResponse(x).response)
  }
}
