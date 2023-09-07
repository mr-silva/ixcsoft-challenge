import { RequestContext } from '../../Adapter/Http'

declare global {
  namespace Express {
    interface Request {
      context: RequestContext
    }
  }
}
