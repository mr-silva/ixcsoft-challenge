import { ViewContract } from '../../../../resources/framework/src'
import { User } from '../../../Domain'

export class UserView extends ViewContract<User, IUserView> {
  render(entity: User): IUserView {
    return {
      id: entity.getId(),
      name: entity.getName(),
      username: entity.getUsername(),
      isOnline: entity.isOnline(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt()
    }
  }
}

export interface IUserView {
  id: string
  name: string
  username: string
  isOnline: boolean
  createdAt?: Date
  updatedAt?: Date
}
