import { ChatMessageDirectionEnum, ChatValueObject, IMessageRepository } from '../../../../Domain'

export class MessageGetChatUseCase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  public async execute(fromUserId: string, toUserId: string): Promise<ChatValueObject[]> {
    if (fromUserId === toUserId) {
      const messages = await this.messageRepository.findMessagesFromUserId(fromUserId, toUserId)

      const chat = messages.map(
        message =>
          new ChatValueObject(
            ChatMessageDirectionEnum.OUT,
            message.getMessage(),
            message.getCreatedAt()
          )
      )

      return chat
    }

    const inMessages = await this.messageRepository.findMessagesFromUserId(fromUserId, toUserId)
    const outMessages = await this.messageRepository.findMessagesFromUserId(toUserId, fromUserId)

    const inChat = inMessages.map(
      message =>
        new ChatValueObject(
          ChatMessageDirectionEnum.IN,
          message.getMessage(),
          message.getCreatedAt()
        )
    )

    const outChat = outMessages.map(
      message =>
        new ChatValueObject(
          ChatMessageDirectionEnum.OUT,
          message.getMessage(),
          message.getCreatedAt()
        )
    )

    return inChat
      .concat(outChat)
      .sort((a, b) => a.getCreatedAt()!.getTime() - b.getCreatedAt()!.getTime())
  }
}
