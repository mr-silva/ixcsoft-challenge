import { RoleTypeEnum } from '../../../../../../resources/framework/src'
import { BaseEntity } from './BaseEntity'

export class UserEntity extends BaseEntity {
  constructor(
    public name: string,
    public username: string,
    public password: string,
    public role: RoleTypeEnum,
    public online: boolean,
    public id: string
  ) {
    super()
  }
}
