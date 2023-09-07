import { RepositoryFactory } from './RepositoryFactory'
import { UserUseCaseFactory } from './UseCase'
import { MessageUseCaseFactory } from './UseCase/MessageUseCaseFactory'

export class UseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  public buildUserUseCase() {
    return new UserUseCaseFactory(this.repositoryFactory)
  }

  public buildMessageUseCase() {
    return new MessageUseCaseFactory(this.repositoryFactory)
  }
}
