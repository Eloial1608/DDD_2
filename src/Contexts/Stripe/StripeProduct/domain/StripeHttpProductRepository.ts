export type StProduct = {
    name: string
    apiKey: string
    price: string
    renovationType: string
    renovationInterval: number
}

export interface StripeHttpProductRepository {
    create (product: StProduct): Promise<string>
}
