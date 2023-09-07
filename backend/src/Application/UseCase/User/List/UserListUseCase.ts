import { IUserRepository, User } from '../../../../Domain'

export class UserListUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(excludeUserId: string): Promise<User[]> {
    return this.userRepository.findAllButOneUser(excludeUserId)
  }
}
