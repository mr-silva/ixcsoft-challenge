import {
  UserCreateUseCase,
  UserGetActiveChatsUseCase,
  UserListUseCase,
  UserUpdateStatusUseCase
} from '../../Application'
import { RepositoryFactory } from '../RepositoryFactory'

export class UserUseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  public buildCreateUseCase() {
    return new UserCreateUseCase(this.repositoryFactory.buildUserRepository())
  }

  public buildUpdateStatusUseCase() {
    return new UserUpdateStatusUseCase(this.repositoryFactory.buildUserRepository())
  }

  public buildListUseCase() {
    return new UserListUseCase(this.repositoryFactory.buildUserRepository())
  }

  public buildGetActiveChatsUseCase() {
    return new UserGetActiveChatsUseCase(
      this.repositoryFactory.buildUserRepository(),
      this.repositoryFactory.buildMessageRepository()
    )
  }
}
