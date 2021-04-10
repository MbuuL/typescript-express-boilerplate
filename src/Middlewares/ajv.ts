import { Request, Response, NextFunction } from 'express'
import Ajv, { JSONSchemaType } from "ajv"

const ajv = new Ajv({allErrors: true})

export const validator = <T>(schema: JSONSchemaType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = ajv.compile(schema)
    if (validate(req.body)) {
      return next()
    } else {
      let response = res.locals.response
      Object.assign(response, {
        code: 400,
        status: 'Bad Request',
        errors: validate.errors
      })
      return res.status(response.code).send(response)
    }
  }
}
