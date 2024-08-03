import { Router } from 'express'
import controllers from '../controllers'
import verifyAuthToken from '../middleware/verifyAuthToken'

const router = Router()

router.get('/api/health-check', controllers.healthCheck)

// User
router.post('/api/users/create', controllers.user.create)
router.post('/api/users/auth', controllers.user.auth)
router.patch('/api/users/get', verifyAuthToken, controllers.user.get)
router.post('/api/users/resend-otp', controllers.user.resendOtp)

// Project
router.post('/api/projects/create', verifyAuthToken, controllers.project.create)
router.get('/api/projects/list', verifyAuthToken, controllers.project.list)

export default router