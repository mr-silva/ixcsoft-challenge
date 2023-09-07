import { AnyObject, FilterQuery, Model, QueryOptions } from 'mongoose'
import { IEntityDataMapper } from '../../../../../DataMapper'
import {
  AlreadyExistsException,
  DataNotFoundException,
  IRepository,
  InvalidDataException,
  PaginatedList,
  PaginatedListFiltersDto,
  SearchableFiltersDto
} from '../../../../../Domain'
import { IFieldsToSort } from '../Interface'
import { MongoServerError } from 'mongodb'

export abstract class MongooseMongoDBRepositoryContract<
  TDomainEntity,
  TDaoEntity extends AnyObject,
  TSearchableFilters extends SearchableFiltersDto = SearchableFiltersDto
> implements IRepository<TDomainEntity, TSearchableFilters>
{
  /**
   * Model do mongoose.
   *
   * @template TDaoEntity
   *
   * @property {Model<TDaoEntity>} model
   */
  protected readonly model: Model<TDaoEntity>

  /**
   * Conversor dos dados entre banco de dados e domínio.
   *
   * @template TDomainEntity
   * @template TDaoEntity
   *
   * @property {IEntityDataMapper<TDomainEntity, TDaoEntity>} dataMapper
   */
  protected readonly dataMapper: IEntityDataMapper<TDomainEntity, TDaoEntity>

  constructor(
    model: Model<TDaoEntity>,
    dataMapper: IEntityDataMapper<TDomainEntity, any>,
    protected dataNotFoundException: DataNotFoundException,
    protected accountId: string | undefined = undefined
  ) {
    this.model = model
    this.dataMapper = dataMapper

    if (!dataNotFoundException) this.dataNotFoundException = new DataNotFoundException()
  }

  /**
   * @inheritDoc
   */
  public async getPaginatedList(
    filters: TSearchableFilters,
    paginationFilters: PaginatedListFiltersDto
  ): Promise<PaginatedList<TDomainEntity>> {
    const query = this.applyFilter(
      this.applySearch(this.customToGetAllOrList({}, filters), filters)
    )

    const paginationAndOrderBy = this.applyOrderBy(
      this.applyPaginator({}, paginationFilters),
      filters
    )

    return new PaginatedList(
      (await this.model.find(query, {}, paginationAndOrderBy)).map(entity =>
        this.dataMapper.toDomain(entity)
      ),
      await this.model.countDocuments(query)
    )
  }

  /**
   * @inheritDoc
   */
  public async getOneById(id: string): Promise<TDomainEntity> {
    const query = this.applyFilter({
      $and: [{ id }]
    })
    const entity = await this.model.findOne(query)

    if (!entity) throw this.dataNotFoundException

    return this.dataMapper.toDomain(entity)
  }

  /**
   * @inheritDoc
   */
  public async create(entity: TDomainEntity): Promise<TDomainEntity> {
    try {
      const result = await this.model.create(this.dataMapper.toDaoEntity(entity))

      return this.dataMapper.toDomain(result)
    } catch (e) {
      console.error(e)
      const mongoServerError: MongoServerError = e as unknown as any

      if (mongoServerError.code === 11000) {
        throw new AlreadyExistsException('User already exists.')
      }

      throw new InvalidDataException(mongoServerError.message)
    }
  }

  /**
   * Cria ou atualiza um registro com base na entidade.
   *
   * @warning Necessário reimplementação pois a descoberta de "chave primária" ainda não foi
   * padronizada no framework.
   *
   * @template TDomainEntity
   *
   * @param {TDomainEntity} entity
   *
   * @example
   *
   * try {
   *   if (!entity.getId()) return await this.create(entity)
   *
   *   await this.update(entity, id)
   *   return await this.getOneById(id)
   * } catch (e) {
   *   console.error(e)
   *   throw e
   * }
   *
   * @returns {Promise<TDomainEntity>}
   */
  public abstract save(entity: TDomainEntity): Promise<TDomainEntity>

  /**
   * @inheritDoc
   */
  public async createMany(entity: TDomainEntity[]): Promise<TDomainEntity[]> {
    try {
      const result = await this.model.insertMany(this.dataMapper.toDaoEntityMany(entity))

      return this.dataMapper.toDomainMany(result)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  /**
   * @inheritDoc
   */
  public async delete(id: string): Promise<void> {
    const query = this.applyFilter({
      $and: [{ id }]
    })

    await this.model.findOneAndDelete(query)
  }

  /**
   * @inheritDoc
   */
  public async update(entity: TDomainEntity, id: string): Promise<boolean> {
    try {
      const query = this.applyFilter({
        $and: [{ id }]
      })

      const result = await this.model.updateOne(query, this.dataMapper.toDaoEntity(entity))

      return !!result.modifiedCount
    } catch (e) {
      return false
    }
  }

  /**
   * Aplica paginação na 'query'.
   *
   * @template TDaoEntity
   *
   * @param {QueryOptions} query
   * @param {PaginatedListFiltersDto} filters
   *
   * @returns {QueryOptions}
   */
  public applyPaginator(query: QueryOptions, filters: PaginatedListFiltersDto): QueryOptions {
    const skip = (filters.getPage() - 1) * filters.getSize()
    const limit = filters.getSize()

    query['skip'] = skip
    query['limit'] = limit

    return query
  }

  /**
   * Permite aplicar modificações na 'query' do método getAll().
   *
   * @template TDaoEntity
   *
   * @param {TSearchableFilters} filters
   * @param {FindManyOptions<TDaoEntity>} query
   *
   * @returns {FindManyOptions<TDaoEntity>}
   */
  protected customToGetAllOrList(
    query: FilterQuery<TDaoEntity>,
    filters: TSearchableFilters
  ): FilterQuery<TDaoEntity> {
    return query
  }

  /**
   * Aplica na 'query' as condições para o filtro de campo de busca.
   *
   * @template TDaoEntity
   *
   * @param {SearchableFiltersDto} filters
   * @param {FilterQuery<TDaoEntity>} query
   *
   * @returns {FilterQuery<TDaoEntity>}
   */
  protected applySearch(
    query: FilterQuery<TDaoEntity>,
    filters: SearchableFiltersDto
  ): QueryOptions {
    const queryFilter = filters.getQuery()

    if (!queryFilter || !this.getFieldsToSearch().length) return query

    const fieldsToWhere: any[] = []
    for (const field of this.getFieldsToSearch()) {
      const nameReg = new RegExp(queryFilter, 'i')
      fieldsToWhere.push({ [field]: { $regex: nameReg } })
    }

    if (fieldsToWhere.length) query.$or = fieldsToWhere as Array<FilterQuery<TDaoEntity>>

    return query
  }

  /**
   * Aplica na 'query' a informação de accountId.
   *
   * @template TDaoEntity
   *
   * @param {PaginatedListFiltersDto} filters
   * @param {FilterQuery<TDaoEntity>} query
   *
   * @returns {FilterQuery<TDaoEntity>}
   */
  protected applyFilter(query: FilterQuery<TDaoEntity>): FilterQuery<TDaoEntity> {
    return query
  }

  /**
   * Aplica na 'query' as condições para a ordernação da listagem.
   *
   * @template TDaoEntity
   *
   * @param {TSearchableFilters} filters
   * @param {FilterQuery<TDaoEntity>} query
   *
   * @returns {FilterQuery<TDaoEntity>}
   */
  public applyOrderBy(query: QueryOptions, filters: TSearchableFilters): QueryOptions {
    if (!Object.keys(this.getFieldsToSort()).length) return query

    query['sort'] = this.getFieldsToSort()

    return query
  }

  /**
   * Retorna a página para a query.
   *
   * @returns {string[]}
   */
  protected getFieldsToSearch(): string[] {
    return []
  }

  /**
   * Retorna os campos para ordenar a listagem.
   *
   * @returns {IFieldsToSort}
   */
  protected getFieldsToSort(): IFieldsToSort {
    return {}
  }

  /**
   * @inheritDoc
   */
  public async getAll(filters: TSearchableFilters): Promise<TDomainEntity[]> {
    const query = this.applyFilter(
      this.applySearch(this.customToGetAllOrList({}, filters), filters)
    )

    const orderBy = this.applyOrderBy({}, filters)

    return (await this.model.find(query, {}, orderBy)).map(e => this.dataMapper.toDomain(e))
  }

  public setAccountId(accountId: string | undefined): this {
    this.accountId = accountId
    return this
  }
}
