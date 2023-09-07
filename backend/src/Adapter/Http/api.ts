import * as dotenv from 'dotenv'
import httpServer from './server'

dotenv.config()
httpServer.start()
