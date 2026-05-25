import express from 'express'
import { login, register, getUser } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import { protect, authorize } from '../middleware/auth.js'
import {validateRegister, validateLogin} from '../validations/authValidation.js'

const router = express.Router()

router.post('/register', validateRegister, validate, register)
router.post('/login', validateLogin, validate, login)
router.get('/user', protect, getUser)

export default router