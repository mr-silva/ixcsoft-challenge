import { ApplicationContext } from '../../../Application'
import jwt from 'jsonwebtoken'
import { DecodedAuthToken } from '../Type'
import { RoleTypeEnum } from '../../../Domain'

export class RequestContext {
  private readonly authToken?: string

  constructor(authToken?: string) {
    this.authToken = authToken
  }

  public getAuthToken(): string | undefined {
    return this.authToken
  }

  public getDecodedAuthToken(): DecodedAuthToken | null {
    if (!this.authToken) return null

    const decodedToken = jwt.decode(this.authToken, { json: true })

    if (!decodedToken) return null

    return decodedToken as DecodedAuthToken
  }

  public toApplication(): ApplicationContext {
    let userId: string | undefined
    let userName: string | undefined
    let userRole: RoleTypeEnum | undefined

    if (this.authToken) {
      const decodedToken = this.getDecodedAuthToken()

      if (decodedToken) {
        userId = decodedToken.user.id
        userName = decodedToken.user.name
        userRole = decodedToken.user.role
      }
    }

    return new ApplicationContext(userId, userName, userRole)
  }
}
