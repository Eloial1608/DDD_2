import { Theme } from '../domain/Theme'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ThemeResponse, ThemeResponseBody } from './ThemeResponse'

export class ThemeCollectionResponse implements QueryResponse<Array<ThemeResponseBody>> {
  response: Array<ThemeResponseBody>

  constructor (theme: Array<Theme>) {
    this.response = theme.map(x => new ThemeResponse(x).response)
  }
}
