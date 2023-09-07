import { IMessageRepository, IUserRepository, User } from '../../../../Domain'

export class UserGetActiveChatsUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly messageRepository: IMessageRepository
  ) {}

  public async execute(id: string): Promise<User[]> {
    const usersIdsActiveChats = await this.messageRepository.findUniqueMessagesToUserId(id)

    const users = await Promise.all(
      usersIdsActiveChats.map(async userIdActiveChat => {
        return await this.userRepository.getOneById(userIdActiveChat)
      })
    )

    return users
  }
}
