import { RoleTypeEnum } from '../../../resources/framework/src'
import { Base } from './Base'

export class User extends Base {
  private online: boolean

  constructor(
    private name: string,
    private username: string,
    private password: string,
    private role: RoleTypeEnum = RoleTypeEnum.CLIENT,
    online?: boolean,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt)

    this.online = online || false
  }

  public getName(): string {
    return this.name
  }

  public getUsername(): string {
    return this.username
  }

  public getPassword(): string {
    return this.password
  }

  public getRole(): RoleTypeEnum {
    return this.role
  }

  public isOnline(): boolean {
    return this.online
  }

  public setOnline(online: boolean): this {
    this.online = online
    return this
  }
}
