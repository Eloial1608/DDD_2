export interface Tokenizer {
    create (
        data: object,
        expiresIn: number
    ): Promise<string>
}
