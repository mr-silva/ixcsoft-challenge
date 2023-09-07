import { Base } from './Base'

export class Message extends Base {
  constructor(
    private fromUserId: string,
    private toUserId: string,
    private message: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt)
  }

  public getFromUserId(): string {
    return this.fromUserId
  }

  public getToUserId(): string {
    return this.toUserId
  }

  public getMessage(): string {
    return this.message
  }
}
