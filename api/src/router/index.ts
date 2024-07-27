import { Router } from 'express'
import controllers from '../controllers'
import verifyAuthToken from '../middleware/verifyAuthToken'

const router = Router()

router.get('/api/health-check', controllers.healthCheck)

router.post('/api/users/create', controllers.user.create)
router.post('/api/users/auth', controllers.user.auth)
router.patch('/api/users/get', verifyAuthToken, controllers.user.get)

export default router