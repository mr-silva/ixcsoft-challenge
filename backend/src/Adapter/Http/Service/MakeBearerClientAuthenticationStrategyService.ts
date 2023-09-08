import { Strategy } from 'passport-http-bearer'
import { EncodedToken } from '../../../Domain'

export class MakeBearerClientAuthenticationStrategyService {
  public static execute() {
    return new Strategy(async function (token, done) {
      try {
        const decodedToken = await EncodedToken.decode(token)

        return done(null, decodedToken?.user)
      } catch (e) {
        return done(e)
      }
    })
  }
}
