import { ErrorDetail } from '../Entity/ErrorDetail'
import { BaseException } from './BaseException'

export class NotAllowedException extends BaseException {
  public constructor(
    message: string = 'You are not allowed to do it.',
    details: Array<ErrorDetail> = []
  ) {
    super(message, details)
  }
}
