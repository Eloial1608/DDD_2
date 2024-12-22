export interface SessionRepository {
    create(priceId: string, successUrl: string, failUrl: string): Promise<{url: string, id: string}>
    verify(id: string): Promise<boolean>
}
