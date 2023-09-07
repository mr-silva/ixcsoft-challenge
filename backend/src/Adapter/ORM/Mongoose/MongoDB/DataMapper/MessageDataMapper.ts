import { EntityDataMapperContract } from '../../../../../../resources/framework/src'
import { Message } from '../../../../../Domain'
import { MessageEntity } from '../Entity'

export class MessageDataMapper extends EntityDataMapperContract<Message, MessageEntity> {
  toDomain(entity: MessageEntity): Message {
    return new Message(
      entity.fromUserId,
      entity.toUserId,
      entity.message,
      entity.id,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: Message): MessageEntity {
    return new MessageEntity(
      domain.getFromUserId(),
      domain.getToUserId(),
      domain.getMessage(),
      domain.getId()
    )
  }
}
