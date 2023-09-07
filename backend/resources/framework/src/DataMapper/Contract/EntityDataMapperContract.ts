import { IEntityDataMapper } from '../Interface/IEntityDataMapper'

export abstract class EntityDataMapperContract<TDomainEntity, TDaoEntity>
  implements IEntityDataMapper<TDomainEntity, TDaoEntity>
{
  abstract toDomain(entity: TDaoEntity): TDomainEntity

  abstract toDaoEntity(domain: TDomainEntity, changePassword?: boolean): TDaoEntity

  toDaoEntityMany(domains: TDomainEntity[], changePassword?: boolean): TDaoEntity[] {
    return domains.map(domain => this.toDaoEntity(domain, changePassword))
  }

  toDomainMany(entities: TDaoEntity[]): TDomainEntity[] {
    return entities.map(entity => this.toDomain(entity))
  }
}
