export class ErrorDetail {
  private readonly values: string[]

  constructor(private readonly id: string, private readonly message: string, values?: string[]) {
    this.values = values || []
  }

  public getId(): string {
    return this.id
  }

  public getMessage(): string {
    return this.message
  }

  public getValues(): string[] {
    return this.values
  }
}
