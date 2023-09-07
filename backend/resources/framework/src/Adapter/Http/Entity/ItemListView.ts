export class ItemListView<Item> {
  constructor(private readonly items: Array<Item>, private readonly total: number) {}
}
