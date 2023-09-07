export class PaginatedList<Item> {
  constructor(private readonly items: Array<Item>, private readonly total: number) {}

  public getItems(): Array<Item> {
    return this.items
  }

  public getTotal(): number {
    return this.total
  }
}
