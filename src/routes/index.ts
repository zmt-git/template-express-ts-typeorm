import { Application } from 'express'
import userRoute from './user'
import systemRoute from './system'

export default function useRouters(app: Application) {
  app.use('/system', systemRoute)
  app.use('/user', userRoute)
}
