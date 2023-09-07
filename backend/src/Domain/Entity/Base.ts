import { v4 } from 'uuid'

export abstract class Base {
  protected id: string

  constructor(id?: string, protected createdAt?: Date, protected updatedAt?: Date) {
    this.id = id || v4()
  }

  public getId(): string {
    return this.id
  }

  public getCreatedAt(): Date | undefined {
    return this.createdAt
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt
  }
}
