import { ErrorDetail } from '../Entity/ErrorDetail'
import { BaseException } from './BaseException'

export class InvalidUserAuthenticationDataException extends BaseException {
  public constructor(
    message: string = 'Invalid user authentication data',
    details: Array<ErrorDetail> = []
  ) {
    super(message, details)
  }
}
