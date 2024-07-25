import { Router } from 'express'
import controllers from '../controllers'

const router = Router()

router.get('/api/health-check', controllers.healthCheck)
router.post('/api/users/create', controllers.user.create)

export default router