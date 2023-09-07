import { NextFunction, Request, Response } from 'express'
import { MakeRequestContextService } from '../Service'

export class MakeContextMiddleware {
  constructor(private readonly makeRequestContextService: MakeRequestContextService) {
    this.handle = this.handle.bind(this)
  }

  public async handle(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.header('Authorization')) {
        response.status(400).json({
          message: 'Authorization token is required.'
        })

        return
      }

      await this.makeRequestContextService.execute(request)
    } catch (error) {
      return next(error)
    }

    next()
  }
}
