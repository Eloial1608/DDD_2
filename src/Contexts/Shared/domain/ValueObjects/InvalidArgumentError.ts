import { DomainError } from "../Errors/DomainError";

export class InvalidArgumentError extends DomainError {
    protected code = 'command-not-registered'

    constructor(protected message: string) {
        super()
    }
}