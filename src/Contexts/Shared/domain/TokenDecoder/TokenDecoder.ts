export interface TokenDecoder {
    run (token: string): object
}
