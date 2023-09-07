import { Connection } from 'mongoose'
import {
  DataNotFoundException,
  IEntityDataMapper,
  MongooseMongoDBRepositoryContract
} from '../../../../../../resources/framework/src'
import { Message, IMessageRepository } from '../../../../../Domain'
import { MessageEntity } from '../Entity'
import { MessageSchema } from '../Schema'

export class MessageRepository
  extends MongooseMongoDBRepositoryContract<Message, MessageEntity>
  implements IMessageRepository
{
  constructor(
    mongoDBConnection: Connection,
    dataMapper: IEntityDataMapper<Message, MessageEntity>,
    dataNotFoundException: DataNotFoundException
  ) {
    super(
      mongoDBConnection.model<MessageEntity>('MessageEntity', MessageSchema),
      dataMapper,
      dataNotFoundException
    )
  }

  public async save(entity: Message): Promise<Message> {
    await this.model.updateOne(
      { id: entity.getId() },
      { $set: this.dataMapper.toDaoEntity(entity, false) },
      { upsert: true }
    )

    return this.getOneById(entity.getId())
  }

  public async findMessagesFromUserId(fromUserId: string, toUserId: string): Promise<Message[]> {
    const result = await this.model.find({
      fromUserId,
      toUserId
    })

    return this.dataMapper.toDomainMany(result)
  }

  public async findUniqueMessagesToUserId(toUserId: string): Promise<string[]> {
    const result = await this.model.distinct('fromUserId', { toUserId })

    return result
  }
}
