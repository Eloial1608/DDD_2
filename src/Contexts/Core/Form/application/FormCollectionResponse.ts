import { Form } from '../domain/Form'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { FormResponse, FormResponseBody } from './FormResponse'

export class FormCollectionResponse implements QueryResponse<Array<FormResponseBody>> {
  response: Array<FormResponseBody>

  constructor (form: Array<Form>) {
    this.response = form.map(x => new FormResponse(x).response)
  }
}
