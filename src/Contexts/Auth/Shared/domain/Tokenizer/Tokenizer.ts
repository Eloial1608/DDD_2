import { TokenData } from '@Shared/domain/TokenDecoder/TokenData'

export interface Tokenizer {
    create (
        data: TokenData,
        expiresIn: number
    ): Promise<string>
}
