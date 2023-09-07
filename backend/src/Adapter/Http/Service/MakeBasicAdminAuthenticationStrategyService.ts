import { BasicStrategy } from 'passport-http'
import { Factory } from '../../../Factory'
import { NotAllowedException, RoleTypeEnum } from '../../../../resources/framework/src'
import { UserView } from '../View'

export class MakeBasicAdminAuthenticationStrategyService {
  public static execute() {
    return new BasicStrategy(async function (username, password, done) {
      const userRepository = Factory.getInstance().buildRepositoryFactory().buildUserRepository()

      try {
        const user = await userRepository.findOneByUsernameAndPassword(username, password)

        if (user.getRole() !== RoleTypeEnum.ADMIN) {
          throw new NotAllowedException()
        }

        return done(null, new UserView().render(user))
      } catch (e) {
        return done(e)
      }
    })
  }
}
