export class SearchableFiltersDto {
  constructor(protected query?: string) {}

  public setQuery(query: string): this {
    this.query = query
    return this
  }

  public getQuery(): string | undefined {
    return this.query
  }
}
