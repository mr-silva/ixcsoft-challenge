import { MessageRepository, MongooseMongoDBDatabase, UserRepository } from '../Adapter/ORM'
import { MessageNotFoundException, UserNotFoundException } from '../Domain'
import { DataMapperFactory } from './DataMapperFactory'

export class RepositoryFactory {
  constructor(private readonly dataMapperFactory: DataMapperFactory) {}

  public buildUserRepository() {
    return new UserRepository(
      MongooseMongoDBDatabase.getConnection(),
      this.dataMapperFactory.buildUserDataMapper(),
      new UserNotFoundException()
    )
  }

  public buildMessageRepository() {
    return new MessageRepository(
      MongooseMongoDBDatabase.getConnection(),
      this.dataMapperFactory.buildMessageDataMapper(),
      new MessageNotFoundException()
    )
  }
}
