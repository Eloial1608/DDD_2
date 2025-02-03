import { Form } from '../domain/Form'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type FormResponseBody = {
    readonly id: string
    readonly name: string,
    readonly content: object[]
    readonly isActive:boolean
    readonly communityId: string
    readonly createdBy: string
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class FormResponse implements QueryResponse<FormResponseBody> {
  response: FormResponseBody

  constructor (form: Form) {
    this.response = {
      id: form.id.valueOf(),
      communityId: form.communityId.valueOf(),
      name: form.name.valueOf(),
      content: form.content.toPrimitives(),
      isActive: form.isActive.valueOf(),
      createdBy: form.createdBy.valueOf(),
      createdAt: form.createdAt.valueOf(),
      updatedAt: form.updatedAt.valueOf()
    }
  }
}
