import { NextFunction, Request, Response } from 'express'
import { Factory } from '../../../Factory'
import { ResponseEntity } from '../../../../resources/framework/src'
import { IUserView, UserView } from '../View'
import { EncodedToken } from '../../../Domain'

export class UserHandler {
  public async create(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildUserUseCase()
        .buildCreateUseCase()
        .execute(request.body)

      return new ResponseEntity(response).created(new UserView().render(result))
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async list(request: Request, response: Response, next: NextFunction) {
    try {
      const user = request.user as IUserView

      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildUserUseCase()
        .buildListUseCase()
        .execute(user.id)

      return new ResponseEntity(response).ok(new UserView().renderMany(result, true))
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async login(request: Request, response: Response, next: NextFunction) {
    try {
      const user = request.user as IUserView

      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildUserUseCase()
        .buildUpdateStatusUseCase()
        .execute({ id: user.id, online: true })

      const token = await Promise.resolve(
        EncodedToken.encode({
          user: {
            id: result.getId(),
            username: result.getUsername(),
            role: result.getRole()
          }
        })
      )

      return new ResponseEntity(response).ok({
        token: token.getToken()
      })
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async logout(request: Request, response: Response, next: NextFunction) {
    try {
      const user = request.user as IUserView

      await Factory.getInstance()
        .buildUseCaseFactory()
        .buildUserUseCase()
        .buildUpdateStatusUseCase()
        .execute({ id: user.id, online: false })

      return new ResponseEntity(response).noContent()
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  public async listActiveChats(request: Request, response: Response, next: NextFunction) {
    try {
      const user = request.user as IUserView

      const result = await Factory.getInstance()
        .buildUseCaseFactory()
        .buildUserUseCase()
        .buildGetActiveChatsUseCase()
        .execute(user.id)

      return new ResponseEntity(response).ok(new UserView().renderMany(result, true))
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}
