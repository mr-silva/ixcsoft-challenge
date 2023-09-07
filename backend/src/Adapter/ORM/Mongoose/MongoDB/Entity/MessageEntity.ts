import { BaseEntity } from './BaseEntity'

export class MessageEntity extends BaseEntity {
  constructor(
    public fromUserId: string,
    public toUserId: string,
    public message: string,
    public id: string
  ) {
    super()
  }
}
