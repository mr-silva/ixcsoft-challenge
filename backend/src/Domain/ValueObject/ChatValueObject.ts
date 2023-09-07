import { ChatMessageDirectionEnum } from '../Enum'

export class ChatValueObject {
  constructor(
    private direction: ChatMessageDirectionEnum,
    private message: string,
    private createdAt?: Date
  ) {}

  public getDirection(): ChatMessageDirectionEnum {
    return this.direction
  }

  public getMessage(): string {
    return this.message
  }

  public getCreatedAt(): Date | undefined {
    return this.createdAt
  }
}
