import { Router } from 'express'
import UserController from '../controller/user'

const router = Router()

router.get('/userInfo', UserController.getInfo)

router.post('/save', UserController.save)

export default router
