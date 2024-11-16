export abstract class DomainError {
    protected abstract code: string
    protected abstract message: string

    getMessage (): string {
      return `[${this.code}] ${this.message}`
    }
}
