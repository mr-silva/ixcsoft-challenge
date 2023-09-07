import { Response } from 'express'
import { HttpStatusEnum } from '../Enum/HttpStatusEnum'
import { ItemListView } from './ItemListView'

export class ResponseEntity<TBody> {
  private status: HttpStatusEnum
  private body: TBody | null

  constructor(response: Response, body?: TBody)
  constructor(response: Response, body?: TBody, status?: HttpStatusEnum)

  constructor(private readonly response: Response, body?: TBody, status?: HttpStatusEnum) {
    this.body = body || null
    this.status = status || (body ? HttpStatusEnum.OK : HttpStatusEnum.NO_CONTENT)
  }

  protected setBody(body: any) {
    this.body = body
    return this
  }

  public addHeader(name: string, value: string) {
    this.response.set(name, value)
  }

  public build() {
    return this.response.status(this.status).send(this.body || undefined)
  }

  public ok(body: TBody) {
    this.status = HttpStatusEnum.OK
    this.setBody(body)

    return this.build()
  }

  public list<Item>(items: Array<Item>, total: number) {
    this.status = HttpStatusEnum.OK
    this.setBody(new ItemListView(items, total))

    return this.build()
  }

  public created(body: TBody) {
    this.status = HttpStatusEnum.CREATED
    this.setBody(body)

    return this.build()
  }

  public noContent() {
    this.status = HttpStatusEnum.NO_CONTENT

    return this.build()
  }
}
