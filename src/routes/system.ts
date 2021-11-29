import { Router } from 'express'
import systemController from '../controller/system'
const router = Router()

router.post('/login', systemController.login)

export default router
