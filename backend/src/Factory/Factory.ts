import { DataMapperFactory } from './DataMapperFactory'
import { RepositoryFactory } from './RepositoryFactory'
import { UseCaseFactory } from './UseCaseFactory'

export class Factory {
  private static instance: Factory

  private constructor() {}

  public static getInstance(): Factory {
    if (!Factory.instance) Factory.instance = new Factory()

    return Factory.instance
  }

  public buildDataMapperFactory() {
    return new DataMapperFactory()
  }

  public buildRepositoryFactory() {
    return new RepositoryFactory(this.buildDataMapperFactory())
  }

  public buildUseCaseFactory() {
    return new UseCaseFactory(this.buildRepositoryFactory())
  }
}
