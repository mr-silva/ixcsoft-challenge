import { ErrorDetail } from '../Entity/ErrorDetail'

export class BaseException extends Error {
  private code: string | undefined

  constructor(public message: string, private details: Array<ErrorDetail> = []) {
    super()
  }

  public setMessage(message: string): this {
    this.message = message
    return this
  }

  public getMessage(): string {
    return this.message
  }

  public addDetail(detail: ErrorDetail): this {
    if (!this.details) this.details = []

    this.details.push(detail)
    return this
  }

  public getDetails(): Array<ErrorDetail> {
    return this.details
  }

  public setCode(code: string): this {
    this.code = code
    return this
  }

  public getCode(): string {
    if (!this.code)
      return `${this.constructor.name
        .substring(0, 1)
        .toLowerCase()}${this.constructor.name.substring(1)}`

    return this.code
  }
}
