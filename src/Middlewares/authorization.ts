import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Users } from '../Models'
import { handleError } from '../Helpers'

const secret = process.env.JWT_SECRET ?? 'secret'

export const validateAuth = async (req: Request, res: Response, next: NextFunction) => {
  const response = res.locals.response
  if (!req.headers.authorization) {
    Object.assign(response, {
      code: 401,
      status: 'Unauthorized',
      error: 'Missing authorization headers'
    })
    return res.status(response.code).send(response)
  }
  const token = req.headers.authorization.replace('Bearer ', '')
  const decodedToken = jwt.verify(token, secret)
  if (typeof decodedToken === 'string') {
    Object.assign(response, {
      code: 401,
      status: 'Unauthorized',
      error: 'Invalid authorization headers'
    })
    return res.status(response.code).send(response)
  }
  const value = Object.values(decodedToken)
  try {
    const user = await Users.findById(value[0])
    if (user) {
      res.locals.user = user
      return next()
    }
    Object.assign(response, {
      code: 401,
      status: 'Unauthorized',
      error: 'Invalid authorization headers'
    })
    return res.status(response.code).send(response)
  } catch (error) {
    handleError(error, response, res)
  }
}