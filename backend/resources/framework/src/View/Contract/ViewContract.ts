export abstract class ViewContract<TDomainModel, TResponseModel> {
  abstract render(entity: TDomainModel, isList?: boolean): TResponseModel

  public renderMany(entities: TDomainModel[], isList: boolean): TResponseModel[] {
    return entities.map(entity => this.render(entity, isList))
  }

  public renderDictionary(entities: TDomainModel[]): TResponseModel {
    throw new Error('Method not implemented.')
  }
}
