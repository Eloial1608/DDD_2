export abstract class DomainError {
    protected abstract code: string
    protected abstract message: string

    getCode (): string {
      return this.code
    }

    getMessage (): string {
      return `[${this.code}] ${this.message}`
    }
}
