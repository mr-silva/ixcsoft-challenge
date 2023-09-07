import {
  MessageCreateUseCase,
  MessageFindFromUserUseCase,
  MessageGetChatUseCase
} from '../../Application'
import { RepositoryFactory } from '../RepositoryFactory'

export class MessageUseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  public buildCreateUseCase() {
    return new MessageCreateUseCase(
      this.repositoryFactory.buildMessageRepository(),
      this.repositoryFactory.buildUserRepository()
    )
  }

  public buildFindFromUserUseCase() {
    return new MessageFindFromUserUseCase(this.repositoryFactory.buildMessageRepository())
  }

  public buildGetChatUseCase() {
    return new MessageGetChatUseCase(this.repositoryFactory.buildMessageRepository())
  }
}
