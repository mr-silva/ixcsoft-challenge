import { IRepository } from '../../../../resources/framework/src'
import { User } from '../../Entity/User'

export interface IUserRepository extends IRepository<User> {
  findOneByUsernameAndPassword(username: string, password: string): Promise<User>
  updateOnlineStatus(id: string, online: boolean): Promise<User>
  findAllButOneUser(excludeUserId: string): Promise<User[]>
}
