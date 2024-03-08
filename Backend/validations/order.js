import { body } from "express-validator";

const phoneRegExp = /^\+380\d{9}$/;

export const orderValidation = [
  body('name', 'Name is too short').not().isEmpty().isString().isLength({min: 3}),
  body('email', 'Invalid email').not().isEmpty().isEmail(),
  body('phone', 'Invalid phone').not().isEmpty().isString().matches(phoneRegExp),
  body('address', 'Invalid address').not().isEmpty().isString(),
  body('totalPrice', 'Invalid price').not().isEmpty().isFloat({ gt: 0 }),
  body('medicationsList', 'Medications list is empty or not an array').isArray({ min: 1 }),
]