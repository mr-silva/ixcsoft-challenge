import { Router } from 'express'
import { MessageHandler, UserHandler } from './Handler'
import passport from 'passport'
import {
  MakeBasicAdminAuthenticationStrategyService,
  MakeBasicClientAuthenticationStrategyService
} from './Service'

const router = Router()

const userHandler = new UserHandler()
const messageHandler = new MessageHandler()

router
  .route('/user')
  .all(
    passport.authenticate(MakeBasicAdminAuthenticationStrategyService.execute(), { session: false })
  )
  .post(userHandler.create.bind(userHandler))

router
  .route('/login')
  .all(
    passport.authenticate(MakeBasicClientAuthenticationStrategyService.execute(), {
      session: false
    })
  )
  .post(userHandler.login.bind(userHandler))

router
  .route('/logout')
  .all(
    passport.authenticate(MakeBasicClientAuthenticationStrategyService.execute(), {
      session: false
    })
  )
  .post(userHandler.logout.bind(userHandler))

router
  .route('/user/list')
  .all(
    passport.authenticate(MakeBasicClientAuthenticationStrategyService.execute(), {
      session: false
    })
  )
  .get(userHandler.list.bind(userHandler))

router
  .route('/message')
  .all(
    passport.authenticate(MakeBasicClientAuthenticationStrategyService.execute(), {
      session: false
    })
  )
  .post(messageHandler.create.bind(messageHandler))

router
  .route('/message/chat/from/:userId')
  .all(
    passport.authenticate(MakeBasicClientAuthenticationStrategyService.execute(), {
      session: false
    })
  )
  .get(messageHandler.getChatWithUser.bind(messageHandler))

router
  .route('/message/chat/active')
  .all(
    passport.authenticate(MakeBasicClientAuthenticationStrategyService.execute(), {
      session: false
    })
  )
  .get(userHandler.listActiveChats.bind(userHandler))

export { router }
