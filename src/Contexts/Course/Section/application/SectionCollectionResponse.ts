import { Section } from '../domain/Section'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { SectionResponse, SectionResponseBody } from './SectionResponse'

export class SectionCollectionResponse implements QueryResponse<Array<SectionResponseBody>> {
  response: Array<SectionResponseBody>

  constructor (section: Array<Section>) {
    this.response = section.map(x => new SectionResponse(x).response)
  }
}
