import crypto from 'crypto'
import { Connection } from 'mongoose'
import {
  DataNotFoundException,
  IEntityDataMapper,
  MongooseMongoDBRepositoryContract
} from '../../../../../../resources/framework/src'
import { User, IUserRepository, EncodePassword } from '../../../../../Domain'
import { UserEntity } from '../Entity'
import { UserSchema } from '../Schema'

export class UserRepository
  extends MongooseMongoDBRepositoryContract<User, UserEntity>
  implements IUserRepository
{
  constructor(
    mongoDBConnection: Connection,
    dataMapper: IEntityDataMapper<User, UserEntity>,
    dataNotFoundException: DataNotFoundException
  ) {
    super(
      mongoDBConnection.model<UserEntity>('UserEntity', UserSchema),
      dataMapper,
      dataNotFoundException
    )
  }

  public async save(entity: User): Promise<User> {
    await this.model.updateOne(
      { id: entity.getId() },
      { $set: this.dataMapper.toDaoEntity(entity, false) },
      { upsert: true }
    )

    return this.getOneById(entity.getId())
  }

  public async findOneByUsernameAndPassword(username: string, password: string): Promise<User> {
    const result = await this.model.findOne({
      username,
      password: EncodePassword.execute(password)
    })

    if (!result) throw this.dataNotFoundException

    return this.dataMapper.toDomain(result)
  }

  public async updateOnlineStatus(id: string, online: boolean): Promise<User> {
    await this.model.updateOne(
      {
        id
      },
      {
        $set: {
          online
        }
      }
    )

    return this.getOneById(id)
  }

  public async findAllButOneUser(excludeUserId: string): Promise<User[]> {
    const result = await this.model.find(
      { id: { $not: { $eq: excludeUserId } } },
      {},
      { sort: { online: 'desc' } }
    )

    return this.dataMapper.toDomainMany(result)
  }
}
