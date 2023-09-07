import { RoleTypeEnum } from '../../Domain'

export class ApplicationContext {
  constructor(
    private readonly userId?: string,
    private readonly userName?: string,
    private readonly userRole?: RoleTypeEnum
  ) {}

  public getUserId(): string | undefined {
    return this.userId
  }

  public getUserName(): string | undefined {
    return this.userName
  }

  public getUserRole(): RoleTypeEnum | undefined {
    return this.userRole
  }
}
