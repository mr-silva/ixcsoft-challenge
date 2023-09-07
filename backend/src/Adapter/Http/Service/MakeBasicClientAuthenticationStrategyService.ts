import { BasicStrategy } from 'passport-http'
import { Factory } from '../../../Factory'
import { UserView } from '../View'

export class MakeBasicClientAuthenticationStrategyService {
  public static execute() {
    return new BasicStrategy(async function (username, password, done) {
      const userRepository = Factory.getInstance().buildRepositoryFactory().buildUserRepository()

      try {
        const user = await userRepository.findOneByUsernameAndPassword(username, password)

        return done(null, new UserView().render(user))
      } catch (e) {
        return done(e)
      }
    })
  }
}
