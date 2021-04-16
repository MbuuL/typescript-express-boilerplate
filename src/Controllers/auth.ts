import { Request, Response } from 'express'
import * as _ from 'lodash'
import jwt from 'jsonwebtoken'
import { Users } from '../Models'
import { hashing, verifyHash, handleError } from '../Helpers'

const jwtSecret = process.env.JWT_SECRET ?? 'secret'

export const register = async (req: Request, res: Response) => {
  const { body: { email, name, password } } = req
  const response = res.locals.response
  try {
    await Users.create({
      email, name, password: hashing(password)
    })
    Object.assign(response, {
      code: 201,
      status: 'Created',
      data: 'Registeration Success'
    })
    return res.status(response.code).send(response)
  } catch (error) {
    handleError(error, response, res)
  }
}

export const login = async (req: Request, res: Response) => {
  const { body: { email, password } } = req
  const response = res.locals.response
  try {
    const user = await Users.findOne({ email })
    if (!user) {
      Object.assign(response, {
        code: 400,
        status: 'Bad Request',
        error: 'Wrong email and password combination!'
      })
      return res.status(response.code).send(response)
    }
    const isVerified = verifyHash(password, user.password)
    if (!isVerified) {
      Object.assign(response, {
        code: 400,
        status: 'Bad Request',
        error: 'Wrong email and password combination!'
      })
      return res.status(response.code).send(response)
    }
    const token = jwt.sign({ id: user._id }, jwtSecret)
    Object.assign(response, {
      code: 200,
      status: 'OK',
      data: {
        name: user.name,
        email: user.email,
        token
      }
    })
    return res.status(response.code).send(response)
  } catch (error) {
    return handleError(error, response, res)
  }
}
