import { Strategy } from 'passport-http-bearer'
import { NotAllowedException, RoleTypeEnum } from '../../../../resources/framework/src'
import { EncodedToken } from '../../../Domain'

export class MakeBearerAdminAuthenticationStrategyService {
  public static execute() {
    return new Strategy(async function (token, done) {
      try {
        const decodedToken = await EncodedToken.decode(token)

        if (decodedToken?.user.role !== RoleTypeEnum.ADMIN) {
          throw new NotAllowedException()
        }

        return done(null, decodedToken?.user)
      } catch (e) {
        return done(e)
      }
    })
  }
}
