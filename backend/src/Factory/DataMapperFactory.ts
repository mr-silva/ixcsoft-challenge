import { MessageDataMapper, UserDataMapper } from '../Adapter/ORM'

export class DataMapperFactory {
  public buildUserDataMapper() {
    return new UserDataMapper()
  }

  public buildMessageDataMapper() {
    return new MessageDataMapper()
  }
}
