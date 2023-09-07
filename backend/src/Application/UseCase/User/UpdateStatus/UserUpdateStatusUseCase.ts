import { IUserRepository, User } from '../../../../Domain'
import { IUserUpdateStatusUseCase } from './IUserUpdateStatusUseCase'

export class UserUpdateStatusUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(dto: IUserUpdateStatusUseCase): Promise<User> {
    const user = await this.userRepository.getOneById(dto.id)

    return this.userRepository.updateOnlineStatus(user.getId(), dto.online)
  }
}
