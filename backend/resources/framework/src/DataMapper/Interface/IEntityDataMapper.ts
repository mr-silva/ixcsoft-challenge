export interface IEntityDataMapper<Domain, Entity> {
  /**
   * Converte uma entidade do adapter para uma entidade do domínio.
   *
   * @template Entity
   *
   * @param {Entity} entity
   *
   * @returns {Domain}
   */
  toDomain(entity: Entity): Domain

  /**
   * Converte uma entidade do domínio para uma entidade do adapter.
   *
   * @template Entity
   *
   * @param {Domain} domain
   *
   * @returns {Entity}
   */
  toDaoEntity(domain: Domain, changePassword?: boolean): Entity

  /**
   * Converte uma lista entidades do domínio para uma lista de entidades do adapter.
   *
   * @template Entity
   *
   * @param {Domain[]} domains
   *
   * @returns {Entity[]}
   */
  toDaoEntityMany(domains: Domain[]): Entity[]

  /**
   * Converte uma lista de entidades do adapter para uma lista de entidades do domínio.
   *
   * @template Entity
   *
   * @param {Entity} entity
   *
   * @returns {Domain[]}
   */
  toDomainMany(entities: Entity[], changePassword?: boolean): Domain[]
}
