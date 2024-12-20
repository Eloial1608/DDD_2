import { StripeProduct } from './StripeProduct'

export interface StripeHttpProductRepository {
    create (apiKey: string, product: StripeProduct): Promise<string>
}
