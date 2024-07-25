import { Router } from 'express'
import controllers from '../controllers'

const router = Router()

router.get('/api/health-check', controllers.healthCheck)

export default router