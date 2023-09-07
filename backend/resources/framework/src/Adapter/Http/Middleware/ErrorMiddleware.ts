import { NextFunction, Request, Response } from 'express'
import {
  AlreadyExistsException,
  BadRequestException,
  BaseException,
  DataNotFoundException,
  InvalidDataException,
  InvalidUserAuthenticationDataException,
  NotAllowedException
} from '../../../Domain'
import { ResponseEntity } from '../Entity'
import { HttpStatusEnum } from '../Enum'
import { IResponseError, IResponseErrorDetail } from '../Interface'

export class ErrorMiddleware {
  public constructor() {
    this.notFound = this.notFound.bind(this)
    this.error = this.error.bind(this)
  }

  public notFound(request: Request, response: Response, next: NextFunction) {
    return this.error(
      new DataNotFoundException('Resource not found.').setCode('resourceNotFound'),
      request,
      response,
      next
    )
  }

  public error(error: Error, request: Request, response: Response, next: NextFunction) {
    let httpCode: HttpStatusEnum = HttpStatusEnum.INTERNAL_SERVER_ERROR
    let body: IResponseError = {
      code: `${httpCode}.internalServerError`,
      message: error.message,
      details: []
    }

    if (error instanceof BaseException) {
      const details: IResponseErrorDetail[] = error.getDetails().map(errorDetail => {
        let detail: IResponseErrorDetail = {
          id: errorDetail.getId(),
          message: errorDetail.getMessage()
        }

        if (errorDetail.getValues().length) detail.enum = errorDetail.getValues()

        return detail
      })

      if (error instanceof InvalidUserAuthenticationDataException)
        httpCode = HttpStatusEnum.UNAUTHORIZED
      else if (error instanceof NotAllowedException) httpCode = HttpStatusEnum.FORBIDDEN
      else if (error instanceof DataNotFoundException) httpCode = HttpStatusEnum.NOT_FOUND
      else if (error instanceof AlreadyExistsException) httpCode = HttpStatusEnum.CONFLICT
      else if (error instanceof InvalidDataException) httpCode = HttpStatusEnum.UNPROCESSABLE_ENTITY
      else if (error instanceof BadRequestException) httpCode = HttpStatusEnum.BAD_REQUEST

      body = {
        ...body,
        code: `${httpCode}.${error.getCode()}`,
        details
      }
    }

    if (httpCode === HttpStatusEnum.INTERNAL_SERVER_ERROR) console.error(error)

    return new ResponseEntity(response, body, httpCode).build()
  }
}
