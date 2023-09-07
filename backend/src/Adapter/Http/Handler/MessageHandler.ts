import { NextFunction, Request, Response } from 'express'
import { Factory } from '../../../Factory'
import { ResponseEntity } from '../../../../resources/framework/src'
import { IUserView, MessageView } from '../View'

export class MessageHandler {
  public async create(request: Request, response: Response, next: NextFunction) {
    try {
      const user = request.user as IUserView

      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildMessageUseCase()
        .buildCreateUseCase()
        .execute({ fromUserId: user.id, ...request.body })

      return new ResponseEntity(response).created(new MessageView().render(result))
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async getChatWithUser(request: Request, response: Response, next: NextFunction) {
    try {
      const user = request.user as IUserView

      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildMessageUseCase()
        .buildGetChatUseCase()
        .execute(request.params.userId, user.id)

      return new ResponseEntity(response).created(result)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}
