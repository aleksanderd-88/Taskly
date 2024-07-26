import { Router } from 'express'
import controllers from '../controllers'

const router = Router()

router.get('/api/health-check', controllers.healthCheck)
router.post('/api/users/create', controllers.user.create)
router.post('/api/users/auth', controllers.user.auth)

export default router