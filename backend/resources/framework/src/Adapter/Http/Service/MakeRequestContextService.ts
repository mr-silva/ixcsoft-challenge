import { Request } from 'express'
import { RequestContext } from '../Entity'

export class MakeRequestContextService {
  public async execute(request: Request): Promise<void> {
    const token = request.header('Authorization')

    let authToken: string | undefined
    if (token && token.split(' ')[0] === 'Bearer') authToken = token.split(' ')[1]

    request.context = new RequestContext(authToken)
  }
}
