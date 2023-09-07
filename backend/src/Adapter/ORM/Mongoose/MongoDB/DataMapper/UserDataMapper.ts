import { EntityDataMapperContract } from '../../../../../../resources/framework/src'
import { User } from '../../../../../Domain'
import { UserEntity } from '../Entity'

export class UserDataMapper extends EntityDataMapperContract<User, UserEntity> {
  toDomain(entity: UserEntity): User {
    return new User(
      entity.name,
      entity.username,
      entity.password,
      entity.role,
      entity.online,
      entity.id,
      entity.createdAt,
      entity.updatedAt
    )
  }

  toDaoEntity(domain: User): UserEntity {
    return new UserEntity(
      domain.getName(),
      domain.getUsername(),
      domain.getPassword(),
      domain.getRole(),
      domain.isOnline(),
      domain.getId()
    )
  }
}
