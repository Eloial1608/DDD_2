import { Nullable } from '@Shared/domain/Nullable'

export class Product {
  constructor (
        readonly id: string,
        readonly type: string,
        readonly priceId: string,
        readonly name: string,
        readonly renovationInterval?: Nullable<number>,
        readonly renovationType?: Nullable<string>
  ) {}

  toPrimitives () {
    return {
      id: this.id,
      type: this.type,
      priceId: this.priceId,
      name: this.name,
      renovationInterval: this.renovationInterval,
      renovationType: this.renovationType
    }
  }
}
