import { StripeProduct } from './StripeProduct'

export interface StripeHttpProductRepository {
    create (apiKey: string, product: Partial<StripeProduct>): Promise<string>
}
