import { ViewContract } from '../../../../resources/framework/src'
import { Message } from '../../../Domain'

export class MessageView extends ViewContract<Message, IMessageView> {
  render(entity: Message, isList?: boolean | undefined): IMessageView {
    return {
      fromUserId: entity.getFromUserId(),
      toUserId: entity.getToUserId(),
      message: entity.getMessage(),
      createdAt: entity.getCreatedAt()
    }
  }
}

interface IMessageView {
  fromUserId: string
  toUserId: string
  message: string
  createdAt?: Date
}
