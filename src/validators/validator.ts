import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'

// common rules
const getIdRules = () => {
  return [param('id').isInt().withMessage("L'identifiant doit être un entier")]
}

// Post rules
const addPostValidationRules = () => {
  return [
    body('title')
      .isLength({ min: 5 })
      .withMessage("La longueur doit être d'au moins 5 caractères"),
    body('content')
      .isLength({ min: 5 })
      .withMessage("La longueur doit être d'au moins 5 caractères"),
  ]
}

const modifyPostValidationRules = () => {
  return [
    param('id').isInt().withMessage("L'identifiant doit être un entier"),
    ...addPostValidationRules(),
  ]
}

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  // let extractedErrors: { [x: string]: any }[]
  let extractedErrors = <any>[]
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

export {
  getIdRules,
  addPostValidationRules,
  modifyPostValidationRules,
  validate,
}
