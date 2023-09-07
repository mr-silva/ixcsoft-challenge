import { IMessageRepository, IUserRepository, Message } from '../../../../Domain'
import { IMessageCreatePayloadDto } from './IMessageCreatePayloadDto'

export class MessageCreateUseCase {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(dto: IMessageCreatePayloadDto): Promise<Message> {
    await this.userRepository.getOneById(dto.toUserId)

    const message = new Message(dto.fromUserId, dto.toUserId, dto.message)

    return this.messageRepository.create(message)
  }
}
