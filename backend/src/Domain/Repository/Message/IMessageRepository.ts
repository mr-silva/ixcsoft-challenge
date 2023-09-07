import { IRepository } from '../../../../resources/framework/src'
import { Message } from '../../Entity'

export interface IMessageRepository extends IRepository<Message> {
  findMessagesFromUserId(fromUserId: string, toUserId: string): Promise<Message[]>
  findUniqueMessagesToUserId(toUserId: string): Promise<string[]>
}
