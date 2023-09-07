import { IMessageRepository, Message } from '../../../../Domain'

export class MessageFindFromUserUseCase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  public async execute(fromUserId: string, toUserId: string): Promise<Message[]> {
    return this.messageRepository.findMessagesFromUserId(fromUserId, toUserId)
  }
}
