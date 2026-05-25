import { body } from 'express-validator'

export const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be atleast 2 characters'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Valid email required')
        .bail()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('password')
        .trim()
        .notEmpty()
        .withMessage('Invalid password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters')
]


export const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
]