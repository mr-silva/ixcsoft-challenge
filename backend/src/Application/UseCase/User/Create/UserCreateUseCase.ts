import { IUserRepository, User } from '../../../../Domain'
import { IUserCreatePayloadDto } from './IUserCreatePayloadDto'

export class UserCreateUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(dto: IUserCreatePayloadDto): Promise<User> {
    const user = new User(dto.name, dto.username, dto.password)

    return this.userRepository.create(user)
  }
}
