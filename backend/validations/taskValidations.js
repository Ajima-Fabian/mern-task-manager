import {body} from 'express-validator'

export const validateCreateTask = [
    body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({min: 3})
    .withMessage('Title must be atleast 3 characters'),

    body('status')
    .optional()
    .isIn(['todo', 'completed', 'in-progress'])
    .withMessage('Invalid status'),

    body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority'),
]

export const validateUpdateTask = [
    body('title')
    .optional()
    .isLength({min: 3})
    .withMessage('Title must be atleast 3 characters'),

    body('status')
    .optional()
    .isIn(['todo', 'in-progress', 'completed'])
    .withMessage('Invalid status'),
    
    body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority')
]