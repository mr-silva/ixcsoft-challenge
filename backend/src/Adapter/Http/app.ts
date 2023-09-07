import cors from 'cors'
import express from 'express'
import { ErrorMiddleware } from '../../../resources/framework/src'
import { router } from './routes'

const httpServer = express()

httpServer.use(express.json())
httpServer.use(express.urlencoded({ extended: false }))
httpServer.use(cors())

httpServer.use(router)

httpServer.use(new ErrorMiddleware().error)
httpServer.use(new ErrorMiddleware().notFound)

httpServer.set('port', process.env.PORT || 3000)

export default httpServer
