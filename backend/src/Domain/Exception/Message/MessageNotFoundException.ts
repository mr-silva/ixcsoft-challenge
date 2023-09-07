import { DataNotFoundException } from '../../../../resources/framework/src'

export class MessageNotFoundException extends DataNotFoundException {
  constructor() {
    super('Message not found.')
  }
}
