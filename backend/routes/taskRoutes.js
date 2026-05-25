import express from 'express'
import { protect } from '../middleware/auth.js'
import { validateCreateTask, validateUpdateTask } from '../validations/taskValidations.js'
import { validate } from '../middleware/validate.js'
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/taskControllers.js'

const router = express.Router()
router.use(protect)

router.post('/', validateCreateTask, validate, createTask)

router.get('/', getTasks)

router.get('/:id', getTask)

router.put('/:id', validateUpdateTask, validate, updateTask)

router.delete('/:id', deleteTask)


export default router