import { IResponseErrorDetail } from './IResponseErrorDetail'

export interface IResponseError {
  code: string
  message: string
  details: Array<IResponseErrorDetail>
}
