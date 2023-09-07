import { SearchableFiltersDto } from './SearchableFiltersDto'

export class PaginatedListFiltersDto extends SearchableFiltersDto {
  protected page: number
  protected size: number

  constructor(page: number = 1, size: number = 15, query?: string) {
    super(query)

    this.page = page > 0 ? page : 1
    this.size = size > 0 ? size : 15
  }

  public getPage(): number {
    return this.page
  }

  public setPage(newPage: number): this {
    let page = this.page
    if (newPage > 0) page = newPage

    this.page = page
    return this
  }

  public getSize(): number {
    return this.size
  }

  public setSize(newSize: number): this {
    let size = this.size
    if (newSize > 0) {
      size = newSize
      if (newSize > 100) {
        size = 100
      }
    }

    this.size = size
    return this
  }
}
