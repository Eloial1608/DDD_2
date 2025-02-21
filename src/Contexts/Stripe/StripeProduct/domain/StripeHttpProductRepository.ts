import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Name } from './ValueObjects/Name'
import { Price } from './ValueObjects/Price'
import { RenovationInterval } from './ValueObjects/RenovationInterval'
import { RenovationType } from './ValueObjects/RenovationType'

export type Params = {
    id: Id
    name: Name
    price: Price
    renovationInterval: Nullable<RenovationInterval>
    renovationType: Nullable<RenovationType>
}
export interface StripeHttpProductRepository {
    create (apiKey: string, product: Params): Promise<string>
}
