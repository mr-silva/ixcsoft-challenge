import { PaginatedList } from '../../Entity'
import { PaginatedListFiltersDto, SearchableFiltersDto } from '../Dto'

export interface IRepository<
  TDomainEntity,
  TSearchableFilters extends SearchableFiltersDto = SearchableFiltersDto
> {
  /**
   * Retorna uma lista paginada de registros com total e items.
   *
   * @template TDomainEntity
   *
   * @param {TSearchableFilters} filters
   * @param {PaginatedListFiltersDto} paginationFilters
   *
   * @returns {Promise<PaginatedList<TDomainEntity>>}
   */
  getPaginatedList(
    filters: TSearchableFilters,
    paginationFilters: PaginatedListFiltersDto
  ): Promise<PaginatedList<TDomainEntity>>

  /**
   * Retorna uma lista de registros sem paginação.
   *
   * @template TDomainEntity
   *
   * @param {TSearchableFilters} filters
   *
   * @returns {Promise<TDomainEntity[]>}
   */
  getAll(filters: TSearchableFilters): Promise<Array<TDomainEntity>>

  /**
   * Retorna um único registro filtrando pelo id.
   *
   * @template TDomainEntity
   *
   * @param {string} id
   *
   * @returns {Promise<TDomainEntity>}
   */
  getOneById(id: string): Promise<TDomainEntity>

  /**
   * Exclui um único registro filtrando pelo id.
   *
   * @template TDomainEntity
   *
   * @param {{} | string} id
   *
   * @returns {Promise<void>}
   */
  delete(id: {} | string): Promise<void>

  /**
   * Cria um registro com base na entidade.
   *
   * @template TDomainEntity
   *
   * @param {TDomainEntity} entity
   *
   * @returns {Promise<TDomainEntity>}
   */
  create(entity: TDomainEntity): Promise<TDomainEntity>

  /**
   * Cria ou atualiza um registro com base na entidade.
   *
   * @template TDomainEntity
   *
   * @param {TDomainEntity} entity
   *
   * @returns {Promise<TDomainEntity>}
   */
  save(entity: TDomainEntity): Promise<TDomainEntity>

  /**
   * Atualiza um registro com base na entidade.
   *
   * @template TDomainEntity
   *
   * @param {TDomainEntity} entity
   * @param {{} | string} conditions
   *
   * @returns {Promise<TDomainEntity>}
   */
  update(entity: TDomainEntity, conditions: {} | string): Promise<TDomainEntity | boolean>

  /**
   * Cria uma lista de registros com base na entidade.
   *
   * @template TDomainEntity
   *
   * @param {TDomainEntity[]} entity
   *
   * @returns {Promise<TDomainEntity[]>}
   */
  createMany(entity: TDomainEntity[]): Promise<TDomainEntity[]>
}
