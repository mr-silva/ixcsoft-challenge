import { DataNotFoundException } from '../../../../resources/framework/src'

export class UserNotFoundException extends DataNotFoundException {
  constructor() {
    super('User not found.')
  }
}
